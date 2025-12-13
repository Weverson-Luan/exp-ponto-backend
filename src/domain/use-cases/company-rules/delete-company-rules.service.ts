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
export class DeleteCompanyRulesService {
  constructor(private prisma: PrismaService) {}

  async execute(id: number) {
    const exists = await this.prisma.companies.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException('Regra de empresa não encontrada!');
    }

    await this.prisma.companies.delete({
      where: { id },
    });

    return { message: 'Regra de empresa removida com sucesso!' };
  }
}
