import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";

// Expose the default Kinde auth endpoints (login, register, callback, logout, etc.)
export async function GET(request: Request, { params }: { params: Promise<{ kindeAuth: string }> }) {
  const { kindeAuth } = await params;
  return handleAuth(request, kindeAuth);
}

export async function POST(request: Request, { params }: { params: Promise<{ kindeAuth: string }> }) {
  const { kindeAuth } = await params;
  return handleAuth(request, kindeAuth);
}
