/*
  Warnings:

  - You are about to drop the `access_tokens` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[access_token]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `access_token` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "access_tokens" DROP CONSTRAINT "access_tokens_user_id_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "access_token" TEXT NOT NULL;

-- DropTable
DROP TABLE "access_tokens";

-- CreateIndex
CREATE UNIQUE INDEX "users_access_token_key" ON "users"("access_token");
