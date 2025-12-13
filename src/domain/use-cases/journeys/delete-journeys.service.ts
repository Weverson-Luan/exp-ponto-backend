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
export class DeleteJourneysService {
  constructor(private prisma: PrismaService) {}

  async execute(id: number) {
    const exists = await this.prisma.journeys.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException('Jornada não encontrada!');
    }

    await this.prisma.journeys.delete({
      where: { id },
    });

    return { message: 'Jornada removida com sucesso!' };
  }
}
