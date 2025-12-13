/**
 * IMPORTS
 */
import { Injectable } from '@nestjs/common';

// services
import { PrismaService } from '../../../infra/database/prisma.service';

// dtos
import { PaginationQueryAuthorizedDevicesDto } from '@src/core/shared/dtos/authorized-devices/pagination-query-authorized-devices.dto';

/**
 * Sempre que criar uma classe com Injectable,
 * ela deve ser registrada no module (providers)
 */
@Injectable()
export class GetAllAuthorizedDevicesService {
  constructor(private prisma: PrismaService) {}

  async findAll({ page = 1, limit = 10 }: PaginationQueryAuthorizedDevicesDto) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.authorizedDevices.findMany({
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.authorizedDevices.count(),
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
