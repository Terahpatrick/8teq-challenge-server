-- CreateEnum
CREATE TYPE "user_role_enum" AS ENUM ('teller', 'admin');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "user_role_enum" NOT NULL DEFAULT E'teller',
    "password" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "teller_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parcel" (
    "id" SERIAL NOT NULL,
    "sender_id" INTEGER NOT NULL,
    "recepient_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer.email_unique" ON "Customer"("email");

-- AddForeignKey
ALTER TABLE "Customer" ADD FOREIGN KEY ("teller_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parcel" ADD FOREIGN KEY ("sender_id") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parcel" ADD FOREIGN KEY ("recepient_id") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
