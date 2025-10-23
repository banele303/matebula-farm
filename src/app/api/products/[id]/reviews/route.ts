import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

type RouteParams = Promise<{ id: string }>;

export async function GET(_: Request, { params }: { params: RouteParams }) {
  const { id } = await params;

  const reviewModel = (prisma as any).review;
  if (!reviewModel) {
    return NextResponse.json(
      { average: 0, count: 0, reviews: [], message: "Reviews not ready yet. Please restart dev to generate Prisma client." },
      { status: 200 },
    );
  }

  const target = await prisma.product.findUnique({ where: { id }, select: { id: true, isActive: true } })
    ?? await prisma.product.findUnique({ where: { slug: id }, select: { id: true, isActive: true } });

  if (!target || !target.isActive) {
    return NextResponse.json({ average: 0, count: 0, reviews: [] }, { status: 404 });
  }

  const [reviews, aggregate] = await Promise.all([
    reviewModel.findMany({
      where: { productId: target.id },
      orderBy: { createdAt: "desc" },
      take: 50,
      select: {
        id: true,
        rating: true,
        comment: true,
        createdAt: true,
        user: { select: { name: true, image: true } },
      },
    }),
    reviewModel.aggregate({
      where: { productId: target.id },
      _avg: { rating: true },
      _count: { _all: true },
    }),
  ]);

  return NextResponse.json({
    average: aggregate._avg.rating ?? 0,
    count: aggregate._count._all,
    reviews,
  });
}

export async function POST(request: Request, { params }: { params: RouteParams }) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Please sign in to write a review." }, { status: 401 });
  }
  const { id } = await params;
  const body = await request.json();
  let rating = Number(body?.rating ?? 0);
  const comment = (body?.comment ?? "").toString().trim();

  if (!id) return NextResponse.json({ error: "Missing product id" }, { status: 400 });
  if (!Number.isFinite(rating)) rating = 0;
  rating = Math.max(1, Math.min(5, Math.floor(rating)));

  const product = await prisma.product.findUnique({ where: { id }, select: { id: true, isActive: true } })
    ?? await prisma.product.findUnique({ where: { slug: id }, select: { id: true, isActive: true } });
  if (!product || !product.isActive) return NextResponse.json({ error: "Product not found" }, { status: 404 });

  const reviewModel = (prisma as any).review;
  if (!reviewModel) {
    return NextResponse.json(
      { error: "Reviews not ready yet. Please restart dev to generate Prisma client." },
      { status: 503 },
    );
  }

  const existing = await reviewModel.findFirst({
    where: { productId: product.id, userId: user.dbId },
    select: { id: true },
  });

  if (existing) {
    return NextResponse.json(
      { error: "You have already reviewed this product." },
      { status: 409 },
    );
  }

  await reviewModel.create({
    data: {
      productId: product.id,
      userId: user.dbId,
      rating,
      comment: comment.length > 0 ? comment : null,
    },
  });

  const [reviews, aggregate] = await Promise.all([
    reviewModel.findMany({
      where: { productId: product.id },
      orderBy: { createdAt: "desc" },
      take: 50,
      select: {
        id: true,
        rating: true,
        comment: true,
        createdAt: true,
        user: { select: { name: true, image: true } },
      },
    }),
    reviewModel.aggregate({
      where: { productId: product.id },
      _avg: { rating: true },
      _count: { _all: true },
    }),
  ]);

  return NextResponse.json({
    average: aggregate._avg.rating ?? 0,
    count: aggregate._count._all,
    reviews,
  });
}
