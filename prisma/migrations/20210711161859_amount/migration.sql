/*
  Warnings:

  - Added the required column `amount` to the `parcels` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "parcel_status" AS ENUM ('sent', 'received');

-- AlterTable
ALTER TABLE "parcels" ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "status" "parcel_status" NOT NULL DEFAULT E'sent';
