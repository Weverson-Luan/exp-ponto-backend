/**
 * IMPORST
 */

// infra / database
import { PrismaService } from '../../src/infra/database/prisma.service';

const prisma = new PrismaService();

import 'dotenv/config';

export const seedRequests = async (user_id: number, company_id: number) => {
  console.log('🌱 Seeding Requests...');

  const company = await prisma.request.upsert({
    where: { id: 1 },
    update: {},
    create: {
      user_id: user_id,
      company_id: company_id,
      type: 'ABONO',
      reason: 'Teste',
      status: 'PENDING',
      requestDate: new Date(),
      attachmentUrl:
        'https://t4.ftcdn.net/jpg/05/86/91/55/240_F_586915596_gPqgxPdgdJ4OXjv6GCcDWNxTjKDWZ3JD.jpg',
    },
  });

  console.log('✅ Requests seeded!');

  return company;
};
