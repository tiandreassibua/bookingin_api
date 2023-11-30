/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `properties` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `properties` MODIFY `location` TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `properties_slug_key` ON `properties`(`slug`);
