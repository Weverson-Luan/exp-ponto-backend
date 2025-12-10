/**
 * IMPORTS
 */
import { Injectable, NotFoundException } from '@nestjs/common';

// services
import { PrismaService } from '../../../infra/database/prisma.service';
// shared / dtos
import { UpdateRoleDto } from '../../../core/shared/dtos/roles/update-roles.dto';

/**
 * Sempre que criar uma classe com o Injectable temos que informa-la
 * no module (providers)
 */
Injectable();
export class UpdateRolesService {
  constructor(private prismaService: PrismaService) {}

  async update(role_id: number, data: UpdateRoleDto) {
    const role = await this.prismaService.roles.findUnique({
      where: { id: role_id },
    });

    if (!role) {
      throw new NotFoundException(`Role com id ${role_id} não encontrada!`);
    }

    const roleUpdate = await this.prismaService.roles.update({
      where: {
        id: role_id,
      },
      data: data,
    });

    return roleUpdate;
  }
}
