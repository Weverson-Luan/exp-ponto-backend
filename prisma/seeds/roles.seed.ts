/**
 * IMPORST
 */

// infra / database
import { PrismaService } from '../../src/infra/database/prisma.service';

// shared / dtos
import { CreateRoleDto } from '../../src/core/shared/dtos/roles/create-roles.dto';

const prisma = new PrismaService();

import 'dotenv/config';

export const seedRoles = async () => {
  console.log('🌱 Seeding roles...');

  const roles = [
    {
      id: 1,
      name: 'admin',
      description: 'Acesso total ao sistema.',
      ativo: true,
    },
    {
      id: 2,
      name: 'supervisor_ti',
      description: 'Gerencia funcionários ti e jornadas.',
      ativo: true,
    },
    {
      id: 3,
      name: 'supervisor_rh',
      description: 'Gerencia funcionários rh e jornadas.',
      ativo: true,
    },
    {
      id: 4,
      name: 'official',
      description: 'Realiza marcação de ponto.',
      ativo: true,
    },
  ] as CreateRoleDto[];

  for (const role of roles) {
    await prisma.roles.upsert({
      where: { id: role.id },
      update: {},
      create: {
        name: role.name,
        description: role.description,
        ativo: role.ativo,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
  }

  console.log('✅ Roles seeded!');
};
