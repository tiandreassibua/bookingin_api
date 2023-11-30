/*
  Warnings:

  - You are about to drop the column `description` on the `rooms` table. All the data in the column will be lost.
  - Added the required column `description` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `properties` ADD COLUMN `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `rooms` DROP COLUMN `description`;
