/**
 * IMPORTS
 */
import { Injectable } from '@nestjs/common';

// services
import { PrismaService } from '../../../infra/database/prisma.service';

// dtos
import { PaginationQueryPointMarkingsDto } from '@src/core/shared/dtos/point-markings/pagination-query-point-markings.dto';

/**
 * Sempre que criar uma classe com Injectable,
 * ela deve ser registrada no module (providers)
 */
@Injectable()
export class GetAllPointMarkingsService {
  constructor(private prisma: PrismaService) {}

  async findAll({ page = 1, limit = 10 }: PaginationQueryPointMarkingsDto) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.pointMarkings.findMany({
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.pointMarkings.count(),
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
