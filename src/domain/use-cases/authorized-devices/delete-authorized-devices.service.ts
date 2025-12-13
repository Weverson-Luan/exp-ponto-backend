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
export class DeleteAuthorizedDevicesService {
  constructor(private prisma: PrismaService) {}

  async execute(id: number) {
    const exists = await this.prisma.authorizedDevices.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException('Dispositivo não encontrado!');
    }

    await this.prisma.authorizedDevices.delete({
      where: { id },
    });

    return { message: 'Dispositivo removido com sucesso!' };
  }
}
