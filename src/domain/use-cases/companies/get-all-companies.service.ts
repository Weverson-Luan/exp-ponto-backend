/**
 * IMPORTS
 */
import { Injectable } from '@nestjs/common';

// services
import { PrismaService } from '../../../infra/database/prisma.service';

// dtos
import { PaginationQueryCompaniesDto } from '@src/core/shared/dtos/companies/pagination-query-companies.dto';

/**
 * Sempre que criar uma classe com Injectable,
 * ela deve ser registrada no module (providers)
 */
@Injectable()
export class GetAllCompaniesService {
  constructor(private prisma: PrismaService) {}

  async findAll({ page = 1, limit = 10 }: PaginationQueryCompaniesDto) {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.prisma.companies.findMany({
        skip,
        take: limit,
        orderBy: { company_name: 'asc' },
      }),
      this.prisma.companies.count(),
    ]);

    return {
      data: items,
      pagination: {
        page,
        limit,
        total,
        last_page: Math.ceil(total / limit),
      },
    };
  }
}
