/**
 * IMPORTS
 */

import { Injectable, NotFoundException } from '@nestjs/common';

// services
import { PrismaService } from '../../../infra/database/prisma.service';

// shared / utils
import { BcryptHasher } from '../../../core/shared/utils/cryptograpy';

// shared / dtos
import { UpdateUserDto } from '../../../core/shared/dtos/users/update-roles.dto';

/**
 * Sempre que criar uma classe com o Injectable temos que informa-la
 * no module (providers)
 */
Injectable();
export class UpdateUsersService {
  constructor(
    private prismaService: PrismaService,
    private bcryptHasher: BcryptHasher,
  ) {}

  async update(user_id: number, data: UpdateUserDto) {
    const updateData: any = { ...data };

    const user = await this.prismaService.users.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${user_id} não encontrado`);
    }

    if (data.password) {
      updateData.password = await this.bcryptHasher.hash(data.password);
    }

    const userUpdated = await this.prismaService.users.update({
      where: { id: user_id },
      data: updateData,
    });

    const { password, ...userWithoutPassword } = userUpdated;

    return userWithoutPassword;
  }
}
