/**
 * IMPORTS
 */
import { ConflictException, Injectable } from '@nestjs/common';

// services
import { PrismaService } from '../../../infra/database/prisma.service';

// dtos
import { CreateJourneyDto } from '@src/core/shared/dtos/journeys/create-journeys.dto';

/**
 * Sempre que criar uma classe com o Injectable temos que informa-la
 * no module (providers)
 */
@Injectable()
export class CreateJourneysService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateJourneyDto) {
    // garante 1 jornada por usuário por dia
    const exists = await this.prisma.journeys.findFirst({
      where: {
        official_id: data.official_id,
        journey_date: new Date(data.journey_date),
      },
    });

    if (exists) {
      throw new ConflictException(
        'Já existe uma jornada registrada para este usuário neste dia!',
      );
    }

    return this.prisma.journeys.create({
      data: {
        official_id: data.official_id,
        entry_time: data.entry_time ? new Date(data.entry_time) : null,
        departure_time: data.departure_time
          ? new Date(data.departure_time)
          : null,
        total_hours: data.total_hours ?? 0,
        absences: data.absences ?? 0,
        extras: data.extras,
        journey_date: new Date(data.journey_date),
        status: data.status as any,
      },
    });
  }
}
