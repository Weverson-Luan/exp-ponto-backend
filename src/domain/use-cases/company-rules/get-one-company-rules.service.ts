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
export class GetOneCompanyRulesService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number) {
    const company = await this.prisma.companyRules.findUnique({
      where: { id },
    });

    if (!company) {
      throw new NotFoundException('Regra de empresa não encontrada!');
    }

    return company;
  }
}
