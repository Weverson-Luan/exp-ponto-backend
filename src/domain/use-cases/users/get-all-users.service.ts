/**
 * IMPORTS
 */

import { Injectable } from '@nestjs/common';

// services
import { PrismaService } from '../../../infra/database/prisma.service';

/**
 * Sempre que criar uma classe com o Injectable temos que informa-la
 * no module (providers)
 */
Injectable();
export class GetAllUsersService {
  constructor(private prismaService: PrismaService) {}

  async findAll({ page = 1, limit = 10 }: { page?: number; limit?: number }) {
    const skip = (page - 1) * limit;

    const userPublicSelect = {
      id: true,
      ativo: true,
      name: true,
      email: true,
      phone: true,
      document: true,
      rg: true,
      naturalness: true,
      father_name: true,
      mother_name: true,
      matriculation: true,
      birth_date: true,
      admission_date: true,
      dismissal_date: true,
      company_id: true,
      role_id: true,
      create_at: true,
      update_at: true,
    } as const;

    const [total, data] = await this.prismaService.$transaction([
      this.prismaService.users.count(),
      this.prismaService.users.findMany({
        skip,
        take: limit,
        orderBy: {
          create_at: 'desc',
        },
        select: userPublicSelect,
      }),
    ]);

    return {
      total,
      totalPages: Math.ceil(total / limit),
      page,
      limit,
      data,
    };
  }
}
