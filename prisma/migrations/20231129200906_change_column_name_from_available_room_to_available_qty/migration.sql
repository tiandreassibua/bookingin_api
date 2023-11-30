/*
  Warnings:

  - You are about to drop the column `availableRoom` on the `rooms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `rooms` DROP COLUMN `availableRoom`,
    ADD COLUMN `availableQty` INTEGER NOT NULL DEFAULT 1;
