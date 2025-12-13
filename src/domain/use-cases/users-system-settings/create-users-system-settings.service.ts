/**
 * IMPORTS
 */
import { Injectable } from '@nestjs/common';

// services
import { PrismaService } from '../../../infra/database/prisma.service';

// dtos
import { CreateUsersSystemSettingsDto } from '@src/core/shared/dtos/users-system-settings/create-create-users-system-settings.dto';

/**
 * Sempre que criar uma classe com o Injectable temos que informa-la
 * no module (providers)
 */
@Injectable()
export class CreateUsersSystemSettingsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUsersSystemSettingsDto) {
    return this.prisma.usersSystemSettings.create({
      data: {
        ...data,
        last_sync_at: new Date(data.last_sync_at),
      },
    });
  }
}
