/**
 * IMPORTS
 */
import { Injectable, NotFoundException } from '@nestjs/common';

// services
import { PrismaService } from '../../../infra/database/prisma.service';

// dtos
import { UpdateJourneysDto } from '@src/core/shared/dtos/journeys/update-journeys.dto';

/**
 * Sempre que criar uma classe com Injectable,
 * ela deve ser registrada no module (providers)
 */
@Injectable()
export class UpdateJourneysService {
  constructor(private prisma: PrismaService) {}

  async update(id: number, data: UpdateJourneysDto) {
    const exists = await this.prisma.journeys.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException('Jornada não encontrada!');
    }

    return this.prisma.journeys.update({
      where: { id },
      data: {
        official_id: data.official_id,
        entry_time: data.entry_time ? new Date(data.entry_time) : null,
        departure_time: data.departure_time
          ? new Date(data.departure_time)
          : null,
        total_hours: data.total_hours ?? 0,
        absences: data.absences ?? 0,
        extras: data.extras,
        journey_date: new Date(data.journey_date!),
        status: data.status as any,
      },
    });
  }
}
