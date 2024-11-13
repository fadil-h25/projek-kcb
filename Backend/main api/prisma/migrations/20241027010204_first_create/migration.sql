/*
  Warnings:

  - You are about to alter the column `waktu_dibuat` on the `absen` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `waktu_diabsen` on the `detail_absen` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `absen` MODIFY `id` VARCHAR(100) NOT NULL DEFAULT uuid(),
    MODIFY `waktu_dibuat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `admin` MODIFY `id` VARCHAR(100) NOT NULL DEFAULT uuid();

-- AlterTable
ALTER TABLE `detail_absen` MODIFY `id` VARCHAR(100) NOT NULL DEFAULT uuid(),
    MODIFY `waktu_diabsen` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `dosen` MODIFY `id` VARCHAR(100) NOT NULL DEFAULT uuid();

-- AlterTable
ALTER TABLE `mahasiswa` MODIFY `id` VARCHAR(100) NOT NULL DEFAULT uuid();
