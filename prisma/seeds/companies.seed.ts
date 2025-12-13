/**
 * IMPORST
 */

// infra / database
import { PrismaService } from '../../src/infra/database/prisma.service';

const prisma = new PrismaService();

import 'dotenv/config';

export const seedCompanies = async () => {
  console.log('🌱 Seeding companies...');

  const company = await prisma.companies.upsert({
    where: { document: '12345678000199' },
    update: {},
    create: {
      company_name: 'Empresa Exemplo',
      company_name_fantasia: 'Empresa Exemplo LTDA',
      document: '12345678000199',
      lat: -23.5505,
      lgn: -46.6333,
    },
  });

  console.log('✅ Companies seeded!');

  return company;
};
