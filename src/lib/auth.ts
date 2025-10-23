import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export interface CurrentUser {
  kindeId: string;
  email: string | null;
  name: string | null;
  image: string | null;
  role: "CUSTOMER" | "ADMIN";
  dbId: string;
}

function buildLoginRedirect(redirectTo?: string) {
  const baseAppUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const destination = redirectTo ?? "/";
  const absoluteDestination = new URL(destination, baseAppUrl).toString();
  const url = new URL("/api/auth/kinde/login", baseAppUrl);
  url.searchParams.set("post_login_redirect_url", absoluteDestination);
  return `${url.pathname}?${url.searchParams.toString()}`;
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();

  if (!kindeUser) {
    return null;
  }

  // Determine admin via allowlist (comma-separated emails), fallback to default admin
  const allowlistRaw = process.env.ADMIN_EMAILS || "alexsouthflow@gmail.com";
  const allowlist = allowlistRaw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const emailLower = kindeUser.email?.toLowerCase() ?? "";
  const isAdminEmail = allowlist.includes(emailLower);

  const userRecord = await prisma.user.upsert({
    where: { kindeId: kindeUser.id },
    update: {
      email: kindeUser.email ?? undefined,
      name: kindeUser.given_name || kindeUser.family_name
        ? `${kindeUser.given_name ?? ""} ${kindeUser.family_name ?? ""}`.trim()
        : kindeUser.email ?? undefined,
      image: kindeUser.picture ?? undefined,
      // Only promote to ADMIN if email is in allowlist; do not downgrade existing roles
      ...(isAdminEmail ? { role: "ADMIN" as const } : {}),
    },
    create: {
      kindeId: kindeUser.id,
      email: kindeUser.email,
      name: kindeUser.given_name || kindeUser.family_name
        ? `${kindeUser.given_name ?? ""} ${kindeUser.family_name ?? ""}`.trim()
        : kindeUser.email ?? kindeUser.id,
      image: kindeUser.picture,
      role: isAdminEmail ? "ADMIN" : "CUSTOMER",
    },
  });

  return {
    kindeId: kindeUser.id,
    email: kindeUser.email ?? null,
    name: userRecord.name,
    image: userRecord.image,
    role: userRecord.role,
    dbId: userRecord.id,
  };
}

export async function requireUser(redirectTo?: string): Promise<CurrentUser> {
  const user = await getCurrentUser();

  if (!user) {
    const loginPath = buildLoginRedirect(redirectTo);
    redirect(loginPath);
  }

  return user;
}
