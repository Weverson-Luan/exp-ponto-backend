/**
 * IMPORST
 */

// infra / database
import { PrismaService } from '../../src/infra/database/prisma.service';

const prisma = new PrismaService();

import 'dotenv/config';

import bcrypt from 'bcryptjs';

export const seedUsers = async (companyId: number) => {
  console.log('🌱 Seeding users...');

  const password = await bcrypt.hash('123456', 10);

  const admin = await prisma.users.upsert({
    where: { email: 'admin@empresa.com' },
    update: {},
    create: {
      ativo: true,
      name: 'Administrador Geral',
      email: 'admin@empresa.com',
      password,
      birth_date: new Date('1990-01-01'),
      phone: '31998887777',
      document: '12345678901',
      rg: '12345678901',
      naturalness: 'brasileiro',
      father_name: 'João',
      mother_name: 'Maria',
      matriculation: '154875',
      admission_date: new Date('2025-01-01'),
      dismissal_date: null,
      company_id: companyId,
      role_id: 1,
    },
  });

  const funcionario = await prisma.users.upsert({
    where: { email: 'joao@empresa.com' },
    update: {},
    create: {
      ativo: true,
      name: 'João Funcionário',
      email: 'func@empresa.com',
      password,
      birth_date: new Date('2010-01-01'),
      document: '10987654321',
      rg: '10987654321',
      naturalness: 'brasileiro',
      father_name: 'Maria',
      mother_name: 'João',
      matriculation: '154875',
      admission_date: new Date('2025-01-01'),
      dismissal_date: null,
      company_id: companyId,
      role_id: 3,
    },
  });

  console.log('✅ Users seeded!');
  return { admin, funcionario };
};
