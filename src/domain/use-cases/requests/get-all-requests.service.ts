/**
 * IMPORTS
 */
import { Injectable } from '@nestjs/common';

// services
import { PrismaService } from '../../../infra/database/prisma.service';

// dtos
import { PaginationQueryRequestsDto } from '@src/core/shared/dtos/requests/pagination-query-requests.dto';

/**
 * Sempre que criar uma classe com Injectable,
 * ela deve ser registrada no module (providers)
 */
@Injectable()
export class GetAllRequestsService {
  constructor(private prisma: PrismaService) {}

  async findAll({ page = 1, limit = 10 }: PaginationQueryRequestsDto) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.request.findMany({
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.request.count(),
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
