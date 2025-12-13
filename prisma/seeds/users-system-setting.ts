/**
 * IMPORST
 */

// infra / database
import { PrismaService } from '../../src/infra/database/prisma.service';

const prisma = new PrismaService();

import 'dotenv/config';

export const seedUsersSystemSetting = async (
  user_id: number,
  company_id: number,
) => {
  console.log('🌱 Seeding Users system setting...');

  const company = await prisma.usersSystemSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      user_id: user_id,
      company_id: company_id,
      is_active: true,
      biometric_enabled: false,
      recongnation_enabled: true,
      push_enabled: false,
      time_zone: 'America/Sao_Paulo',
      last_sync_at: new Date(),
    },
  });

  console.log('✅ Users system setting seeded!');

  return company;
};
