/**
 * IMPORTS
 */
import { Injectable } from '@nestjs/common';

// services
import { PrismaService } from '../../../infra/database/prisma.service';

// shared / dtos
import { CreateRoleDto } from '../../../core/shared/dtos/roles/create-roles.dto';

/**
 * Sempre que criar uma classe com o Injectable temos que informa-la
 * no module (providers)
 */
Injectable();
export class CrateRolesService {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateRoleDto) {
    const roleCreated = await this.prismaService.roles.create({
      data: data,
    });

    return roleCreated;
  }
}
