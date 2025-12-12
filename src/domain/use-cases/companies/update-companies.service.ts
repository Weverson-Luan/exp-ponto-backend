/**
 * IMPORTS
 */
import { Injectable, NotFoundException } from '@nestjs/common';

// services
import { PrismaService } from '../../../infra/database/prisma.service';

// dtos
import { UpdateCompanyDto } from '@src/core/shared/dtos/companies/update-companies.dto';

/**
 * Sempre que criar uma classe com Injectable,
 * ela deve ser registrada no module (providers)
 */
@Injectable()
export class UpdateCompaniesService {
  constructor(private prisma: PrismaService) {}

  async update(id: number, data: UpdateCompanyDto) {
    const exists = await this.prisma.companies.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException('Empresa não encontrada!');
    }

    return this.prisma.companies.update({
      where: { id },
      data,
    });
  }
}
