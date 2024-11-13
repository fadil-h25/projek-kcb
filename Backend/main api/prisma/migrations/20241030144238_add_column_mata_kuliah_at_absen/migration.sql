/*
  Warnings:

  - You are about to alter the column `waktu_dibuat` on the `absen` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `waktu_diabsen` on the `detail_absen` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Added the required column `mata_kuliah` to the `Absen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `absen` ADD COLUMN `mata_kuliah` VARCHAR(100) NOT NULL,
    MODIFY `waktu_dibuat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `detail_absen` MODIFY `waktu_diabsen` TIMESTAMP NULL;
