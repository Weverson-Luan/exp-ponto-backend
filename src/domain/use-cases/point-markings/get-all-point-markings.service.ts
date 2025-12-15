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
    const baseUrl = process.env.APP_URL ?? 'http://localhost:3001';

    const [data, total] = await Promise.all([
      this.prisma.pointMarkings.findMany({
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
        include: {
          photos: {
            where: { is_active: true },
            orderBy: { created_at: 'desc' },
            take: 1,
            select: {
              file_url: true,
            },
          },
        },
      }),
      this.prisma.pointMarkings.count(),
    ]);

    const items = data.map(({ photos, ...marking }) => {
      const photo = photos?.[0];

      return {
        ...marking,
        photo_url: photo?.file_url
          ? `${baseUrl}/${photo.file_url}`
              .replace(/\\/g, '/') // corrige Windows path
              .replace(/\/+/g, '/') // remove //
              .replace(':/', '://')
          : null,
      };
    });

    return {
      total,
      totalPages: Math.ceil(total / limit),
      page,
      limit,
      data: items,
    };
  }
}
