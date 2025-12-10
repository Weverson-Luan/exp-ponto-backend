/**
 * IMPORTS
 */

import { Injectable, NotFoundException } from '@nestjs/common';

// services
import { PrismaService } from '../../../infra/database/prisma.service';

/**
 * Sempre que criar uma classe com o Injectable temos que informa-la
 * no module (providers)
 */
Injectable();
export class DeleteOneRoleByService {
  constructor(private prismaService: PrismaService) {}

  async delete(id: number) {
    const role = await this.prismaService.roles.findUnique({
      where: { id },
    });

    if (!role) {
      throw new NotFoundException(`Role com id ${id} não encontrada!`);
    }

    const roleDeleted = await this.prismaService.roles.delete({
      where: { id },
    });

    return roleDeleted;
  }
}
