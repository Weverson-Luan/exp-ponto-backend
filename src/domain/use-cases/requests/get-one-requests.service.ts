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
export class GetOneRequestsService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number) {
    const request = await this.prisma.request.findUnique({
      where: { id },
    });

    if (!request) {
      throw new NotFoundException('Solicitação não encontrada!');
    }

    return request;
  }
}
