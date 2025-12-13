/**
 * IMPORTS
 */
import { Injectable, NotFoundException } from '@nestjs/common';

// services
import { PrismaService } from '../../../infra/database/prisma.service';

// dtos
import { UpdateCompanyRulesDto } from '@src/core/shared/dtos/company-rules/update-company-rules.dto';

/**
 * Sempre que criar uma classe com Injectable,
 * ela deve ser registrada no module (providers)
 */
@Injectable()
export class UpdateCompanyRulesService {
  constructor(private prisma: PrismaService) {}

  async update(id: number, data: UpdateCompanyRulesDto) {
    const exists = await this.prisma.companyRules.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException('Regra de empresa não encontrada!');
    }

    return this.prisma.companyRules.update({
      where: { id },
      data,
    });
  }
}
