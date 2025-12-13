/*
  Warnings:

  - You are about to drop the column `create_at` on the `authorized_devices` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `authorized_devices` table. All the data in the column will be lost.
  - You are about to drop the column `company_name_fatasia` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `company_rules` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `company_rules` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `journeys` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `journeys` table. All the data in the column will be lost.
  - You are about to alter the column `total_hours` on the `journeys` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `extras` on the `journeys` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the column `create_at` on the `point_markings` table. All the data in the column will be lost.
  - You are about to drop the column `data_hours` on the `point_markings` table. All the data in the column will be lost.
  - You are about to drop the column `lng` on the `point_markings` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `point_markings` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[company_id]` on the table `company_rules` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `authorized_devices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `company_rules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `journeys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marked_at` to the `point_markings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `point_markings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `birth_date` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "point_markings_data_hours_idx";

-- AlterTable
ALTER TABLE "authorized_devices" DROP COLUMN "create_at",
DROP COLUMN "update_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "companies" DROP COLUMN "company_name_fatasia",
DROP COLUMN "create_at",
DROP COLUMN "update_at",
ADD COLUMN     "company_name_fantasia" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "company_rules" DROP COLUMN "create_at",
DROP COLUMN "update_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "journeys" DROP COLUMN "create_at",
DROP COLUMN "update_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "journey_date" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "total_hours" DROP NOT NULL,
ALTER COLUMN "total_hours" SET DEFAULT 0,
ALTER COLUMN "total_hours" SET DATA TYPE INTEGER,
ALTER COLUMN "extras" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "point_markings" DROP COLUMN "create_at",
DROP COLUMN "data_hours",
DROP COLUMN "lng",
DROP COLUMN "update_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lgn" DOUBLE PRECISION,
ADD COLUMN     "marked_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "create_at",
DROP COLUMN "update_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "create_at",
DROP COLUMN "update_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "birth_date" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "company_rules_company_id_key" ON "company_rules"("company_id");

-- CreateIndex
CREATE INDEX "point_markings_marked_at_idx" ON "point_markings"("marked_at");
