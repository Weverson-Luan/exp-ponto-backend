/**
 * IMPORTS
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/infra/database/prisma.service';

import { PointMarkings } from 'generated/prisma/client';

/**
 * Sempre que criar uma classe com Injectable,
 * ela deve ser registrada no module (providers)
 */
@Injectable()
export class PointMarkingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserAndPeriod(
    official_id: number,
    start: Date,
    end: Date,
  ): Promise<PointMarkings[]> {
    console.log('start', start);
    console.log('end', end);
    console.log('official_id', official_id);

    return this.prisma.pointMarkings.findMany({
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
    });
  }
}
