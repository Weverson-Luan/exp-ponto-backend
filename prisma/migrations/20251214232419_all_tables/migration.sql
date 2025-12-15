-- CreateEnum
CREATE TYPE "MarkingType" AS ENUM ('input', 'output_interval', 'return_interval', 'output');

-- CreateEnum
CREATE TYPE "MarkingOrigin" AS ENUM ('mobile', 'web', 'qr', 'admin');

-- CreateEnum
CREATE TYPE "RolesName" AS ENUM ('admin', 'supervisor_ti', 'supervisor_rh', 'official');

-- CreateEnum
CREATE TYPE "JourneyStatus" AS ENUM ('normal', 'incompleto', 'absences', 'day_off');

-- CreateEnum
CREATE TYPE "RequestType" AS ENUM ('ABONO', 'AJUSTE', 'AVULSA');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "name" "RolesName" NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "role_id" INTEGER,
    "company_id" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "phone" TEXT,
    "document" TEXT NOT NULL,
    "rg" TEXT,
    "naturalness" TEXT,
    "father_name" TEXT,
    "mother_name" TEXT,
    "matriculation" TEXT,
    "admission_date" TIMESTAMP(3),
    "dismissal_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "company_name" TEXT NOT NULL,
    "company_name_fantasia" TEXT,
    "document" TEXT NOT NULL,
    "lat" DOUBLE PRECISION,
    "lgn" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_rules" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "daily_workload" INTEGER NOT NULL,
    "late_tolerance" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "minimum_interval" INTEGER NOT NULL,
    "max_extra_per_day" INTEGER,
    "rounding_method" TEXT NOT NULL DEFAULT 'none',
    "break_required" BOOLEAN NOT NULL DEFAULT true,
    "valid_from" TIMESTAMP(3) NOT NULL,
    "valid_to" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "point_markings" (
    "id" SERIAL NOT NULL,
    "official_id" INTEGER,
    "type" "MarkingType" NOT NULL,
    "marked_at" TIMESTAMP(3) NOT NULL,
    "lat" DOUBLE PRECISION,
    "lgn" DOUBLE PRECISION,
    "origin" "MarkingOrigin" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "point_markings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "point_marking_photos" (
    "id" SERIAL NOT NULL,
    "point_marking_id" INTEGER,
    "official_id" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "file_url" TEXT NOT NULL,
    "origin" "MarkingOrigin" NOT NULL,
    "face_detected" BOOLEAN NOT NULL DEFAULT false,
    "face_score" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "point_marking_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "journeys" (
    "id" SERIAL NOT NULL,
    "official_id" INTEGER,
    "entry_time" TIMESTAMP(3),
    "departure_time" TIMESTAMP(3),
    "total_hours" INTEGER DEFAULT 0,
    "absences" INTEGER NOT NULL DEFAULT 0,
    "extras" INTEGER,
    "journey_date" TIMESTAMP(3),
    "status" "JourneyStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "journeys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "requests" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "company_id" INTEGER,
    "type" "RequestType" NOT NULL,
    "reason" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL,
    "request_date" TIMESTAMP(3) NOT NULL,
    "attachment_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authorized_devices" (
    "id" SERIAL NOT NULL,
    "official_id" INTEGER,
    "device_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "authorized_in" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "authorized_devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_system_settings" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "company_id" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "biometric_enabled" BOOLEAN NOT NULL DEFAULT true,
    "recongnation_enabled" BOOLEAN NOT NULL DEFAULT true,
    "push_enabled" BOOLEAN NOT NULL DEFAULT true,
    "time_zone" TEXT NOT NULL DEFAULT 'America/Sao_Paulo',
    "last_sync_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_system_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_document_key" ON "users"("document");

-- CreateIndex
CREATE UNIQUE INDEX "companies_document_key" ON "companies"("document");

-- CreateIndex
CREATE UNIQUE INDEX "company_rules_company_id_key" ON "company_rules"("company_id");

-- CreateIndex
CREATE INDEX "point_markings_official_id_idx" ON "point_markings"("official_id");

-- CreateIndex
CREATE INDEX "point_markings_marked_at_idx" ON "point_markings"("marked_at");

-- CreateIndex
CREATE INDEX "point_marking_photos_point_marking_id_idx" ON "point_marking_photos"("point_marking_id");

-- CreateIndex
CREATE INDEX "point_marking_photos_official_id_idx" ON "point_marking_photos"("official_id");

-- CreateIndex
CREATE INDEX "journeys_official_id_idx" ON "journeys"("official_id");

-- CreateIndex
CREATE INDEX "requests_user_id_idx" ON "requests"("user_id");

-- CreateIndex
CREATE INDEX "requests_company_id_idx" ON "requests"("company_id");

-- CreateIndex
CREATE INDEX "requests_status_idx" ON "requests"("status");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_rules" ADD CONSTRAINT "company_rules_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "point_markings" ADD CONSTRAINT "point_markings_official_id_fkey" FOREIGN KEY ("official_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "point_marking_photos" ADD CONSTRAINT "point_marking_photos_point_marking_id_fkey" FOREIGN KEY ("point_marking_id") REFERENCES "point_markings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "point_marking_photos" ADD CONSTRAINT "point_marking_photos_official_id_fkey" FOREIGN KEY ("official_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journeys" ADD CONSTRAINT "journeys_official_id_fkey" FOREIGN KEY ("official_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authorized_devices" ADD CONSTRAINT "authorized_devices_official_id_fkey" FOREIGN KEY ("official_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_system_settings" ADD CONSTRAINT "users_system_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_system_settings" ADD CONSTRAINT "users_system_settings_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
