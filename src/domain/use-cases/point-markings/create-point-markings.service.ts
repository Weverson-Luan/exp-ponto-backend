/**
 * IMPORTS
 */
import { Injectable } from '@nestjs/common';

// services
import { PrismaService } from '../../../infra/database/prisma.service';

// dtos
import {
  CreatePointMarkingsDto,
  PointMarkingsTypeEnum,
  PointMarkingsSourceEnum,
} from '@src/core/shared/dtos/point-markings/create-point-markings.dto';

/**
 * Sempre que criar uma classe com Injectable,
 * ela deve ser registrada no module (providers)
 */
@Injectable()
export class CreatePointMarkingsService {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreatePointMarkingsDto) {
    const pointMarkingsCreated = await this.prismaService.pointMarkings.create({
      data: {
        official_id: data.official_id,
        type: data.type as PointMarkingsTypeEnum,
        marked_at: new Date(data.marked_at),
        lat: data.lat,
        lgn: data.lgn,
        origin: data.origin as PointMarkingsSourceEnum,
      },
    });

    return pointMarkingsCreated;
  }
}
