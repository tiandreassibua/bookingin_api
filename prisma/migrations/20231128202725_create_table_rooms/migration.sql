-- CreateTable
CREATE TABLE
    `rooms` (
        `id` INTEGER NOT NULL AUTO_INCREMENT,
        `propertyId` INTEGER NOT NULL,
        `image` VARCHAR(150) NOT NULL,
        `name` VARCHAR(150) NOT NULL,
        `price` INTEGER NOT NULL DEFAULT 0,
        `maxPeople` INTEGER NOT NULL DEFAULT 1,
        `createdAt` DATETIME (3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        `updatedAt` DATETIME (3) NOT NULL,
        PRIMARY KEY (`id`)
    ) DEFAULT CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- AddForeignKey
ALTER TABLE `rooms` ADD CONSTRAINT `rooms_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `properties` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;