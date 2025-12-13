/**
 * IMPORTS
 */
import { Injectable } from '@nestjs/common';

// services
import { PrismaService } from '../../../infra/database/prisma.service';

// dtos
import { CreateCompanyRulesDto } from '@src/core/shared/dtos/company-rules/create-company-rules.dto';

/**
 * Sempre que criar uma classe com Injectable,
 * ela deve ser registrada no module (providers)
 */
@Injectable()
export class CreateCompanyRulesService {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateCompanyRulesDto) {
    const companyCreated = await this.prismaService.companyRules.create({
      data: {
        ...data,
      },
    });

    return companyCreated;
  }
}
