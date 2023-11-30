-- CreateTable
CREATE TABLE
    `users` (
        `id` INTEGER NOT NULL AUTO_INCREMENT,
        `firstName` VARCHAR(50) NOT NULL,
        `lastName` VARCHAR(50) NOT NULL,
        `email` VARCHAR(50) NOT NULL,
        `password` VARCHAR(200) NOT NULL,
        `phone` VARCHAR(30) NOT NULL,
        `isAdmin` BOOLEAN NOT NULL DEFAULT false,
        `createdAt` DATETIME (3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        `updatedAt` DATETIME (3) NOT NULL,
        UNIQUE INDEX `users_email_key` (`email`),
        PRIMARY KEY (`id`)
    ) DEFAULT CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;