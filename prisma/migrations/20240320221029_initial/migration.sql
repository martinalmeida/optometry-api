/*
  Warnings:

  - You are about to alter the column `num_doc` on the `patients` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `phone` on the `patients` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `patients` MODIFY `num_doc` INTEGER NOT NULL,
    MODIFY `phone` INTEGER NOT NULL;
