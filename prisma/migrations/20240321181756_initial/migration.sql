-- CreateTable
CREATE TABLE `Blacklist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` JSON NOT NULL,
    `created` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `created` DATETIME(3) NOT NULL,
    `updated` DATETIME(3) NULL,
    `deleted` DATETIME(3) NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Patients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NULL,
    `tp_doc` VARCHAR(191) NOT NULL,
    `num_doc` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `date_of_birth` DATETIME(3) NOT NULL,
    `age` INTEGER NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `id_user` INTEGER NOT NULL,
    `created` DATETIME(3) NOT NULL,
    `updated` DATETIME(3) NULL,
    `deleted` DATETIME(3) NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Patients_num_doc_key`(`num_doc`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OptometricHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ocular_conditions` VARCHAR(191) NULL,
    `family_history` VARCHAR(191) NULL,
    `visual_acuity_left` VARCHAR(191) NULL,
    `visual_acuity_right` VARCHAR(191) NULL,
    `refraction_left` VARCHAR(191) NULL,
    `refraction_right` VARCHAR(191) NULL,
    `intraocular_pressure` VARCHAR(191) NULL,
    `slit_lamp_exam` VARCHAR(191) NULL,
    `fundoscopy` VARCHAR(191) NULL,
    `diagnosis` VARCHAR(191) NULL,
    `treatment_plan` VARCHAR(191) NULL,
    `follow_up_date` DATETIME(3) NULL,
    `visual_field_test` VARCHAR(191) NULL,
    `color_vision_test` VARCHAR(191) NULL,
    `corneal_topography` VARCHAR(191) NULL,
    `anterior_segment` VARCHAR(191) NULL,
    `posterior_segment` VARCHAR(191) NULL,
    `other_notes` VARCHAR(191) NULL,
    `id_user` INTEGER NOT NULL,
    `id_pat` INTEGER NOT NULL,
    `created` DATETIME(3) NOT NULL,
    `updated` DATETIME(3) NULL,
    `deleted` DATETIME(3) NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
