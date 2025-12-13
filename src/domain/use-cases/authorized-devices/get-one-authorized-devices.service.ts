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
export class GetOneAuthorizedDevicesService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number) {
    const authorizedDevices = await this.prisma.authorizedDevices.findUnique({
      where: { id },
    });

    if (!authorizedDevices) {
      throw new NotFoundException('Dispositivo não encontrado!');
    }

    return authorizedDevices;
  }
}
