-- AlterTable
ALTER TABLE `rooms` ADD COLUMN `availableRoom` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `bedQty` INTEGER NOT NULL DEFAULT 1;
