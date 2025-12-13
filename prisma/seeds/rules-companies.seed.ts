/**
 * IMPORST
 */

// infra / database
import { PrismaService } from '../../src/infra/database/prisma.service';

const prisma = new PrismaService();

import 'dotenv/config';

export const seedCompanyRules = async (companyId: number) => {
  console.log('🌱 Seeding company rules...');

  await prisma.companyRules.create({
    data: {
      company_id: companyId as number,
      daily_workload: 28800, // 8h em segundos
      late_tolerance: 600, // 10min
      valid_from: new Date('2025-01-01T08:00:00'),
      valid_to: null,
      start_time: new Date('2025-01-01T08:00:00'),
      end_time: new Date('2025-01-01T17:00:00'),
      minimum_interval: 3600, // 1h em segundos
      max_extra_per_day: 7200, // 2h em segundos
      rounding_method: 'none',
      break_required: true,
    },
  });

  console.log('✅ Company rules seeded!');
};
