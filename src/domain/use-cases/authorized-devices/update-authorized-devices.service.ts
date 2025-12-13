/**
 * IMPORTS
 */
import { Injectable, NotFoundException } from '@nestjs/common';

// services
import { PrismaService } from '../../../infra/database/prisma.service';

// dtos
import { UpdateAuthorizedDevicesDto } from '@src/core/shared/dtos/authorized-devices/update-authorized-devices.dto';

/**
 * Sempre que criar uma classe com Injectable,
 * ela deve ser registrada no module (providers)
 */
@Injectable()
export class UpdateAuthorizedDevicesService {
  constructor(private prisma: PrismaService) {}

  async update(id: number, data: UpdateAuthorizedDevicesDto) {
    const exists = await this.prisma.authorizedDevices.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException('Dispositivo não encontrado!');
    }

    return this.prisma.authorizedDevices.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }
}
