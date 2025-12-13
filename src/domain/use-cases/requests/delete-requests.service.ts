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
export class DeleteRequestsService {
  constructor(private prisma: PrismaService) {}

  async execute(id: number) {
    const exists = await this.prisma.request.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException('Solicitação não encontrada!');
    }

    await this.prisma.request.delete({
      where: { id },
    });

    return { message: 'Solicitação removida com sucesso!' };
  }
}
