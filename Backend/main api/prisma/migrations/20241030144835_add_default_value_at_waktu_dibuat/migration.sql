/*
  Warnings:

  - You are about to alter the column `waktu_dibuat` on the `absen` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Made the column `waktu_diabsen` on table `detail_absen` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `absen` MODIFY `waktu_dibuat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `detail_absen` MODIFY `waktu_diabsen` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
