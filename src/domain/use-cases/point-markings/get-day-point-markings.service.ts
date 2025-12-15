/**
 * IMPORTS
 */
import { BadRequestException, Injectable } from '@nestjs/common';

// services
import { PointMarkingRepository } from '@src/infra/repositories/point-markings/point-marking.repository';

/**
 * Sempre que criar uma classe com Injectable,
 * ela deve ser registrada no module (providers)
 */
@Injectable()
export class GetDayPointMarkingsService {
  constructor(private readonly pointMarkingRepo: PointMarkingRepository) {}

  async execute(official_id: number, date: string) {
    if (!date) {
      throw new BadRequestException('Data não foi informada!');
    }

    const start = new Date(`${date}T00:00:00`);
    const end = new Date(`${date}T23:59:59`);

    const markings = await this.pointMarkingRepo.findByUserAndPeriod(
      official_id,
      start,
      end,
    );

    return markings;
  }
}
