/**
 * IMPORTS
 */
import { Injectable } from '@nestjs/common';

// services
import { PrismaService } from '../../../infra/database/prisma.service';

// dtos
import { PaginationQueryJourneysDto } from '@src/core/shared/dtos/journeys/pagination-query-journeys.dto';

/**
 * Sempre que criar uma classe com Injectable,
 * ela deve ser registrada no module (providers)
 */
@Injectable()
export class GetAllJourneysService {
  constructor(private prisma: PrismaService) {}

  async findAll({ page = 1, limit = 10 }: PaginationQueryJourneysDto) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.journeys.findMany({
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.journeys.count(),
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
