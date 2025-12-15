/**
 * IMPORTS
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma.service';

// dtos
import {
  CreatePointMarkingsDto,
  PointMarkingsTypeEnum,
  PointMarkingsSourceEnum,
} from '@src/core/shared/dtos/point-markings/create-point-markings.dto';

@Injectable()
export class CreatePointMarkingsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePointMarkingsDto, file: any) {
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.users.findUnique({
        where: { id: data.official_id },
      });

      if (!user) {
        throw new NotFoundException('Usuário não encontrado!');
      }
      // cria a marcação
      const point = await tx.pointMarkings.create({
        data: {
          official_id: data.official_id,
          type: data.type as PointMarkingsTypeEnum,
          marked_at: new Date(data.marked_at),
          lat: data.lat,
          lgn: data.lgn,
          origin: data.origin as PointMarkingsSourceEnum,
        },
      });

      // cria o registro da foto
      await tx.pointMarkingPhotos.create({
        data: {
          point_marking_id: point.id,
          official_id: data.official_id,
          file_url: file.path,
          origin: data.origin as PointMarkingsSourceEnum,
          face_detected: true,
          is_active: true,
        },
      });

      return { data: null, error: null };
    });
  }
}
