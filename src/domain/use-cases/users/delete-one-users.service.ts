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
export class DeleteOneUsersByService {
  constructor(private prismaService: PrismaService) {}

  async delete(id: number) {
    const user = await this.prismaService.users.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado!`);
    }

    const userDeleted = await this.prismaService.users.delete({
      where: { id },
    });

    return userDeleted;
  }
}
