-- CreateEnum
CREATE TYPE "MarkingType" AS ENUM ('input', 'output_interval', 'return_interval', 'output');

-- CreateEnum
CREATE TYPE "MarkingOrigin" AS ENUM ('mobile', 'web', 'qr', 'admin');

-- CreateEnum
CREATE TYPE "RolesName" AS ENUM ('admin', 'supervisor_ti', 'supervisor_rh', 'official');

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "name" "RolesName" NOT NULL,
    "description" TEXT,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

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
    "birth_date" TIMESTAMP(3),
    "phone" TEXT,
    "document" TEXT NOT NULL,
    "rg" TEXT,
    "naturalness" TEXT,
    "father_name" TEXT,
    "mother_name" TEXT,
    "matriculation" TEXT,
    "admission_date" TIMESTAMP(3),
    "dismissal_date" TIMESTAMP(3),
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "company_name" TEXT NOT NULL,
    "company_name_fatasia" TEXT,
    "document" TEXT NOT NULL,
    "lat" DOUBLE PRECISION,
    "lgn" DOUBLE PRECISION,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_rules" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "daily_workload" INTEGER NOT NULL,
    "late_tolerance" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "minimum_interval" INTEGER NOT NULL,
    "max_extra_per_day" INTEGER,
    "rounding_method" TEXT NOT NULL DEFAULT 'none',
    "break_required" BOOLEAN NOT NULL DEFAULT true,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "point_markings" (
    "id" SERIAL NOT NULL,
    "official_id" INTEGER,
    "type" "MarkingType" NOT NULL,
    "data_hours" TIMESTAMP(3) NOT NULL,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "origin" "MarkingOrigin" NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "point_markings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "journeys" (
    "id" SERIAL NOT NULL,
    "official_id" INTEGER,
    "entry_time" TIMESTAMP(3),
    "departure_time" TIMESTAMP(3),
    "total_hours" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "absences" INTEGER NOT NULL DEFAULT 0,
    "extras" DOUBLE PRECISION,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "journeys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authorized_devices" (
    "id" SERIAL NOT NULL,
    "official_id" INTEGER,
    "device_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "authorized_in" TIMESTAMP(3) NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "authorized_devices_pkey" PRIMARY KEY ("id")
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
CREATE INDEX "point_markings_official_id_idx" ON "point_markings"("official_id");

-- CreateIndex
CREATE INDEX "point_markings_data_hours_idx" ON "point_markings"("data_hours");

-- CreateIndex
CREATE INDEX "journeys_official_id_idx" ON "journeys"("official_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_rules" ADD CONSTRAINT "company_rules_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "point_markings" ADD CONSTRAINT "point_markings_official_id_fkey" FOREIGN KEY ("official_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journeys" ADD CONSTRAINT "journeys_official_id_fkey" FOREIGN KEY ("official_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authorized_devices" ADD CONSTRAINT "authorized_devices_official_id_fkey" FOREIGN KEY ("official_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
