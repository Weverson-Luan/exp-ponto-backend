/**
 * IMPORTS
 */
import { Injectable, NotFoundException } from '@nestjs/common';

// services
import { PrismaService } from '../../../infra/database/prisma.service';

// dtos
import { UpdateUsersSystemSettingsDto } from '@src/core/shared/dtos/users-system-settings/update-create-users-system-settings.dto';

/**
 * Sempre que criar uma classe com Injectable,
 * ela deve ser registrada no module (providers)
 */
@Injectable()
export class UpdateUsersSystemSettingsService {
  constructor(private prisma: PrismaService) {}

  async update(id: number, data: UpdateUsersSystemSettingsDto) {
    const exists = await this.prisma.usersSystemSettings.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException('Configurações de usuário não encontradas!');
    }

    return this.prisma.usersSystemSettings.update({
      where: { id },
      data: {
        ...data,
        last_sync_at: new Date(data.last_sync_at!),
      },
    });
  }
}
