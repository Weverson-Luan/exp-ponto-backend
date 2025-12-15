/**
 * IMPORTS
 */
import { BadRequestException, Injectable } from '@nestjs/common';

// infra // repositories
import { PointMarkingMirrorRepository } from '@src/infra/repositories/point-markings/point-marking-mirro.repository';

// domain // factories
import { PointMirrorFactory } from '@src/domain/factories/journeys/journey-interval.rule';

// shared // utils
import { handleEndOfDay } from '@src/core/shared/utils/end-of-day';
import { handleStartOfDay } from '@src/core/shared/utils/start-of-day';

/**
 * Sempre que criar uma classe com Injectable,
 * ela deve ser registrada no module (providers)
 */
@Injectable()
export class GetMirrorPointMarkingsService {
  constructor(private respository: PointMarkingMirrorRepository) {}

  async execute(user_id: number, start: string, end: string) {
    if (!start || !end) {
      throw new BadRequestException(
        'Período inicial e final são obrigatórios!',
      );
    }
    const start_date = handleStartOfDay(start);
    const end_date = handleEndOfDay(end);
    const pointMarkings = await this.respository.findByUserAndPeriod(
      user_id,
      start_date,
      end_date,
    );

    const grouped = new Map<string, any[]>();

    pointMarkings.forEach((marking) => {
      const day = marking.marked_at.toISOString().slice(0, 10);

      if (!grouped.has(day)) {
        grouped.set(day, []);
      }

      grouped.get(day)!.push(marking);
    });

    return Array.from(grouped.entries()).map(([date, markings]) =>
      PointMirrorFactory.buildDay(date, markings),
    );
  }
}
