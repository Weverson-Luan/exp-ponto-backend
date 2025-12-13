/**
 * IMPORTS
 */
import { Injectable, NotFoundException } from '@nestjs/common';

// services
import { PrismaService } from '../../../infra/database/prisma.service';

/**
 * Sempre que criar uma classe com Injectable,
 * ela deve ser registrada no module (providers)
 */
@Injectable()
export class GetOneJourneysService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number) {
    const journeys = await this.prisma.journeys.findUnique({
      where: { id },
    });

    if (!journeys) {
      throw new NotFoundException('Jornada não encontrada!');
    }

    return journeys;
  }
}
