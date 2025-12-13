/**
 * IMPORTS
 */
import { Injectable, NotFoundException } from '@nestjs/common';

// services
import { PrismaService } from '../../../infra/database/prisma.service';

// dtos
import { CreateAuthorizedDevicesDto } from '@src/core/shared/dtos/authorized-devices/create-authorized-devices.dto';

/**
 * Sempre que criar uma classe com o Injectable temos que informa-la
 * no module (providers)
 */
@Injectable()
export class CreateAuthorizedDevicesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAuthorizedDevicesDto) {
    const user = await this.prisma.users.findUnique({
      where: { id: data.official_id },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    return this.prisma.authorizedDevices.create({
      data: {
        ...data,
      },
    });
  }
}
