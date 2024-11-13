/*
  Warnings:

  - The primary key for the `absen` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `absen` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(36)`.
  - You are about to alter the column `id_dosen` on the `absen` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(36)`.
  - You are about to alter the column `waktu_dibuat` on the `absen` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - The primary key for the `admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `admin` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(36)`.
  - The primary key for the `detail_absen` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `detail_absen` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(36)`.
  - You are about to alter the column `id_absen` on the `detail_absen` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(36)`.
  - You are about to alter the column `id_mahasiswa` on the `detail_absen` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(36)`.
  - You are about to alter the column `waktu_diabsen` on the `detail_absen` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - The primary key for the `dosen` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `dosen` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(36)`.
  - The primary key for the `mahasiswa` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `mahasiswa` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(36)`.

*/
-- DropForeignKey
ALTER TABLE `absen` DROP FOREIGN KEY `Absen_id_dosen_fkey`;

-- DropForeignKey
ALTER TABLE `detail_absen` DROP FOREIGN KEY `Detail_Absen_id_absen_fkey`;

-- DropForeignKey
ALTER TABLE `detail_absen` DROP FOREIGN KEY `Detail_Absen_id_mahasiswa_fkey`;

-- AlterTable
ALTER TABLE `absen` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(36) NOT NULL,
    MODIFY `id_dosen` VARCHAR(36) NOT NULL,
    MODIFY `waktu_dibuat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `admin` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `detail_absen` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(36) NOT NULL,
    MODIFY `id_absen` VARCHAR(36) NOT NULL,
    MODIFY `id_mahasiswa` VARCHAR(36) NOT NULL,
    MODIFY `waktu_diabsen` TIMESTAMP NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `dosen` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `mahasiswa` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Absen` ADD CONSTRAINT `Absen_id_dosen_fkey` FOREIGN KEY (`id_dosen`) REFERENCES `Dosen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detail_Absen` ADD CONSTRAINT `Detail_Absen_id_mahasiswa_fkey` FOREIGN KEY (`id_mahasiswa`) REFERENCES `Mahasiswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detail_Absen` ADD CONSTRAINT `Detail_Absen_id_absen_fkey` FOREIGN KEY (`id_absen`) REFERENCES `Absen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
