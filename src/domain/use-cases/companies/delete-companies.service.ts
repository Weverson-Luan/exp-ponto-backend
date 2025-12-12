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
export class DeleteCompaniesService {
  constructor(private prisma: PrismaService) {}

  async execute(id: number) {
    const exists = await this.prisma.companies.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException('Empresa não encontrada!');
    }

    await this.prisma.companies.delete({
      where: { id },
    });

    return { message: 'Empresa removida com sucesso!' };
  }
}
