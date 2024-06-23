/*
  Warnings:

  - You are about to drop the column `createdAt` on the `projects` table. All the data in the column will be lost.
  - Added the required column `type` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Made the column `image_url` on table `projects` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ProjetcType" AS ENUM ('FRONTEND', 'BACKEND');

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "type" "ProjetcType" NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "image_url" SET NOT NULL;
