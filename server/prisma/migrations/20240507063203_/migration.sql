/*
  Warnings:

  - The values [OWNER] on the enum `MemberRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `owner` on the `Channel` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MemberRole_new" AS ENUM ('ADMIN', 'MEMBER');
ALTER TABLE "ChannelMember" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "ChannelMember" ALTER COLUMN "role" TYPE "MemberRole_new" USING ("role"::text::"MemberRole_new");
ALTER TYPE "MemberRole" RENAME TO "MemberRole_old";
ALTER TYPE "MemberRole_new" RENAME TO "MemberRole";
DROP TYPE "MemberRole_old";
ALTER TABLE "ChannelMember" ALTER COLUMN "role" SET DEFAULT 'MEMBER';
COMMIT;

-- DropIndex
DROP INDEX "User_email_key";

-- DropIndex
DROP INDEX "User_name_key";

-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "owner",
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
