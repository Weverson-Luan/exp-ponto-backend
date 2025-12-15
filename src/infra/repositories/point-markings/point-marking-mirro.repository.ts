/**
 * IMPORTS
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/infra/database/prisma.service';

/**
 * Sempre que criar uma classe com Injectable,
 * ela deve ser registrada no module (providers)
 */
@Injectable()
export class PointMarkingMirrorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserAndPeriod(
    official_id: number,
    start: Date,
    end: Date,
  ): Promise<any[]> {
    return await this.prisma.pointMarkings.findMany({
      where: {
        official_id,
        marked_at: {
          gte: start,
          lte: end,
        },
      },
      orderBy: {
        marked_at: 'asc',
      },
      select: {
        id: true,
        official_id: true,
        marked_at: true,
        type: true,
        origin: true,
        lat: true,
        lgn: true,
      },
    });
  }
}
