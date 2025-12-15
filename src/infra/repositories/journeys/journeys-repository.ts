/**
 * IMPORTS
 */

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/infra/database/prisma.service';

import { Journeys } from 'generated/prisma/client';
import { IJourneysRepository } from './journeys-type.repository';

/**
 * Sempre que criar uma classe com Injectable,
 * ela deve ser registrada no module (providers)
 */
@Injectable()
export class JourneysRepository implements IJourneysRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserAndDate(
    official_id: number,
    date: Date,
  ): Promise<Journeys | null> {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const journey = await this.prisma.journeys.findFirst({
      where: {
        official_id,
        journey_date: {
          gte: start,
          lte: end,
        },
      },
    });

    const defaults = {};

    return journey ?? (defaults as any);
  }

  async countOccurrences(user_id: number, date: Date) {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
      23,
      59,
      59,
    );

    return this.prisma.journeys.count({
      where: {
        official_id: user_id,
        journey_date: { gte: start, lte: end },
        status: {
          not: 'normal',
        },
      },
    });
  }

  async getBankHours(user_id: number, date: Date) {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
      23,
      59,
      59,
    );

    const result = await this.prisma.journeys.aggregate({
      where: {
        official_id: user_id,
        journey_date: { gte: start, lte: end },
      },
      _sum: {
        extras: true,
      },
    });

    return Number(result._sum.extras ?? 0);
  }

  async countAbsences(user_id: number, date: Date) {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
      23,
      59,
      59,
    );

    return this.prisma.journeys.count({
      where: {
        official_id: user_id,
        journey_date: { gte: start, lte: end },
        status: 'absences',
      },
    });
  }
}
