/*
  Warnings:

  - The primary key for the `absen` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `absen` table. The data in that column could be lost. The data in that column will be cast from `VarChar(36)` to `Int`.
  - You are about to alter the column `waktu_dibuat` on the `absen` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - The primary key for the `detail_absen` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `detail_absen` table. The data in that column could be lost. The data in that column will be cast from `VarChar(36)` to `Int`.
  - You are about to alter the column `id_absen` on the `detail_absen` table. The data in that column could be lost. The data in that column will be cast from `VarChar(36)` to `Int`.
  - You are about to alter the column `waktu_diabsen` on the `detail_absen` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- DropForeignKey
ALTER TABLE `detail_absen` DROP FOREIGN KEY `Detail_Absen_id_absen_fkey`;

-- AlterTable
ALTER TABLE `absen` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `waktu_dibuat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `detail_absen` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_absen` INTEGER NOT NULL,
    MODIFY `waktu_diabsen` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Detail_Absen` ADD CONSTRAINT `Detail_Absen_id_absen_fkey` FOREIGN KEY (`id_absen`) REFERENCES `Absen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
