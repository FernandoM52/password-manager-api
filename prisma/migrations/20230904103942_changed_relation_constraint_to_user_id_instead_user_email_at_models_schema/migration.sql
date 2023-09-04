/*
  Warnings:

  - You are about to drop the column `userEmail` on the `cards` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `credentials` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `notes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title,userId]` on the table `cards` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title,userId]` on the table `credentials` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title,userId]` on the table `notes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `credentials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `notes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cards" DROP CONSTRAINT "cards_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "credentials" DROP CONSTRAINT "credentials_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "notes" DROP CONSTRAINT "notes_userEmail_fkey";

-- DropIndex
DROP INDEX "cards_title_userEmail_key";

-- DropIndex
DROP INDEX "credentials_title_userEmail_key";

-- DropIndex
DROP INDEX "notes_title_userEmail_key";

-- AlterTable
ALTER TABLE "cards" DROP COLUMN "userEmail",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "credentials" DROP COLUMN "userEmail",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "notes" DROP COLUMN "userEmail",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cards_title_userId_key" ON "cards"("title", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "credentials_title_userId_key" ON "credentials"("title", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "notes_title_userId_key" ON "notes"("title", "userId");

-- AddForeignKey
ALTER TABLE "credentials" ADD CONSTRAINT "credentials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
