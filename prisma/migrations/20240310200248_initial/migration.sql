/*
  Warnings:

  - Added the required column `date_of_birth` to the `Patients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `patients` ADD COLUMN `date_of_birth` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `OptometricHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ocular_conditions` VARCHAR(191) NOT NULL,
    `family_history` VARCHAR(191) NOT NULL,
    `visual_acuity_left` VARCHAR(191) NOT NULL,
    `visual_acuity_right` VARCHAR(191) NOT NULL,
    `refraction_left` VARCHAR(191) NOT NULL,
    `refraction_right` VARCHAR(191) NOT NULL,
    `intraocular_pressure` VARCHAR(191) NOT NULL,
    `slit_lamp_exam` VARCHAR(191) NOT NULL,
    `fundoscopy` VARCHAR(191) NOT NULL,
    `diagnosis` VARCHAR(191) NOT NULL,
    `treatment_plan` VARCHAR(191) NOT NULL,
    `follow_up_date` DATETIME(3) NULL,
    `visual_field_test` VARCHAR(191) NOT NULL,
    `color_vision_test` VARCHAR(191) NOT NULL,
    `corneal_topography` VARCHAR(191) NOT NULL,
    `anterior_segment` VARCHAR(191) NOT NULL,
    `posterior_segment` VARCHAR(191) NOT NULL,
    `other_notes` VARCHAR(191) NOT NULL,
    `id_user` INTEGER NOT NULL,
    `id_pat` INTEGER NOT NULL,
    `created` DATETIME(3) NOT NULL,
    `updated` DATETIME(3) NULL,
    `deleted` DATETIME(3) NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
