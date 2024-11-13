-- CreateTable
CREATE TABLE `admin` (
    `id` VARCHAR(100) NOT NULL DEFAULT uuid(),
    `nama` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mahasiswa` (
    `id` VARCHAR(100) NOT NULL DEFAULT uuid(),
    `nama` VARCHAR(100) NOT NULL,
    `nim` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `Mahasiswa_nim_key`(`nim`),
    UNIQUE INDEX `Mahasiswa_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dosen` (
    `id` VARCHAR(100) NOT NULL DEFAULT uuid(),
    `nama` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `Dosen_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Absen` (
    `id` VARCHAR(100) NOT NULL DEFAULT uuid(),
    `id_dosen` VARCHAR(100) NOT NULL,
    `waktu_dibuat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Detail_Absen` (
    `id` VARCHAR(100) NOT NULL DEFAULT uuid(),
    `id_absen` VARCHAR(100) NOT NULL,
    `id_mahasiswa` VARCHAR(100) NOT NULL,
    `waktu_diabsen` TIMESTAMP NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Absen` ADD CONSTRAINT `Absen_id_dosen_fkey` FOREIGN KEY (`id_dosen`) REFERENCES `Dosen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detail_Absen` ADD CONSTRAINT `Detail_Absen_id_mahasiswa_fkey` FOREIGN KEY (`id_mahasiswa`) REFERENCES `Mahasiswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detail_Absen` ADD CONSTRAINT `Detail_Absen_id_absen_fkey` FOREIGN KEY (`id_absen`) REFERENCES `Absen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
