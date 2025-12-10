/**
 * IMPORST
 */

// infra / database
import { PrismaService } from '../../src/infra/database/prisma.service';

const prisma = new PrismaService();

import 'dotenv/config';

export const seedDevices = async (userId: number) => {
  console.log('🌱 Seeding authorized devices...');

  await prisma.authorizedDevices.create({
    data: {
      official_id: userId,
      device_id: 'device-001',
      name: 'iPhone do João',
      authorized_in: new Date(),
    },
  });

  console.log('✅ Devices seeded!');
};
