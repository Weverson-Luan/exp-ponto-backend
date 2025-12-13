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
export class GetOnePointMarkingsService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number) {
    const pointMarkings = await this.prisma.pointMarkings.findUnique({
      where: { id },
    });

    if (!pointMarkings) {
      throw new NotFoundException('Marcação de ponto não encontrada!');
    }

    return pointMarkings;
  }
}
