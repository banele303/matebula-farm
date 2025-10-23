-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "onSale" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "saleDiscountPercent" INTEGER,
ADD COLUMN     "saleEndsAt" TIMESTAMP(3);
