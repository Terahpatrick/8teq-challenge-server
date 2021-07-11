/*
  Warnings:

  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Parcel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_teller_id_fkey";

-- DropForeignKey
ALTER TABLE "Parcel" DROP CONSTRAINT "Parcel_recepient_id_fkey";

-- DropForeignKey
ALTER TABLE "Parcel" DROP CONSTRAINT "Parcel_sender_id_fkey";

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "Parcel";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "user_role_enum" NOT NULL DEFAULT E'teller',
    "password" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "teller_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parcels" (
    "id" SERIAL NOT NULL,
    "sender_id" INTEGER NOT NULL,
    "recepient_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users.email_unique" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customers.email_unique" ON "customers"("email");

-- AddForeignKey
ALTER TABLE "customers" ADD FOREIGN KEY ("teller_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parcels" ADD FOREIGN KEY ("sender_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parcels" ADD FOREIGN KEY ("recepient_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
