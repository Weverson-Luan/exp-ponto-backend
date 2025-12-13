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
export class DeletePointMarkingsService {
  constructor(private prisma: PrismaService) {}

  async execute(id: number) {
    const exists = await this.prisma.pointMarkings.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException('Marcação de ponto não encontrada!');
    }

    await this.prisma.pointMarkings.delete({
      where: { id },
    });

    return { message: 'Marcação de ponto removida com sucesso!' };
  }
}
