-- CreateTable
CREATE TABLE
    `properties` (
        `id` INTEGER NOT NULL AUTO_INCREMENT,
        `slug` VARCHAR(255) NOT NULL,
        `name` VARCHAR(150) NOT NULL,
        `address` VARCHAR(150) NOT NULL,
        `city` VARCHAR(50) NOT NULL,
        `image` TEXT NOT NULL,
        `location` VARCHAR(150) NOT NULL,
        `rating` INTEGER NOT NULL DEFAULT 0,
        `createdAt` DATETIME (3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        `updatedAt` DATETIME (3) NOT NULL,
        PRIMARY KEY (`id`)
    ) DEFAULT CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;