/**
 * IMPORTS
 */
import { Injectable, NotFoundException } from '@nestjs/common';

// services
import { PrismaService } from '../../../infra/database/prisma.service';

// dtos
import { UpdatePointMarkingsDto } from '@src/core/shared/dtos/point-markings/update-point-markings.dto';

/**
 * Sempre que criar uma classe com Injectable,
 * ela deve ser registrada no module (providers)
 */
@Injectable()
export class UpdatePointMarkingsService {
  constructor(private prisma: PrismaService) {}

  async update(id: number, data: UpdatePointMarkingsDto) {
    const exists = await this.prisma.pointMarkings.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException('Marcação de ponto não encontrada!');
    }

    return this.prisma.pointMarkings.update({
      where: { id },
      data: {
        official_id: data.official_id,
        type: data.type as any,
        marked_at: data.marked_at,
        lat: data.lat,
        lgn: data.lgn,
        origin: data.origin as any,
      },
    });
  }
}
