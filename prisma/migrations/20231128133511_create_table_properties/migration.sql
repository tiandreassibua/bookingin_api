/*
  Warnings:

  - Added the required column `category` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `properties` ADD COLUMN `category` ENUM('hotel', 'apartment') NOT NULL;
