-- CreateTable
CREATE TABLE `Planta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nombreComun` VARCHAR(191) NOT NULL,
    `nombreCientifico` VARCHAR(191) NOT NULL,
    `familia` VARCHAR(191) NOT NULL,
    `precio` DOUBLE NOT NULL,
    `stock` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
