/**
 * IMPORTS
 */
import { ConflictException, Injectable } from '@nestjs/common';

// services
import { PrismaService } from '../../../infra/database/prisma.service';

// dtos
import { CreateCompanyDto } from '@src/core/shared/dtos/companies/create-companies.dto';

/**
 * Sempre que criar uma classe com Injectable,
 * ela deve ser registrada no module (providers)
 */
@Injectable()
export class CreateCompaniesService {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateCompanyDto) {
    const companyAlreadyExists = await this.prismaService.companies.findFirst({
      where: {
        document: data.document,
      },
    });

    if (companyAlreadyExists) {
      throw new ConflictException('Empresa já cadastrada com este documento!');
    }

    const companyCreated = await this.prismaService.companies.create({
      data: {
        company_name: data.company_name,
        company_name_fantasia: data.company_name_fantasia,
        document: data.document,
        lat: data.lat,
        lgn: data.lgn,
      },
    });

    return companyCreated;
  }
}
