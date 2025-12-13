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
export class GetOneUsersSystemSettingsService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number) {
    const usersSystemSettings =
      await this.prisma.usersSystemSettings.findUnique({
        where: { id },
      });

    if (!usersSystemSettings) {
      throw new NotFoundException('Configurações de usuário não encontradas!');
    }

    return usersSystemSettings;
  }
}
