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
export class DeleteUsersSystemSettingsService {
  constructor(private prisma: PrismaService) {}

  async execute(id: number) {
    const exists = await this.prisma.usersSystemSettings.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException('Configurações de usuário não encontradas!');
    }

    await this.prisma.usersSystemSettings.delete({
      where: { id },
    });

    return { message: 'Configurações de usuário removidas com sucesso!' };
  }
}
