/**
 * IMPORTS
 */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../../infra/database/prisma.service';

import {
  CreatePointMarkingsDto,
  PointMarkingsTypeEnum,
} from '@src/core/shared/dtos/point-markings/create-point-markings.dto';

import { SyncPointMarkingsDto } from '@src/core/shared/dtos/point-markings/sync-point-markings.dto';

@Injectable()
export class SyncPointMarkingsService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(officialId: number, data: SyncPointMarkingsDto) {
    /**
     * 1️⃣ Validar usuário
     */
    const user = await this.prisma.users.findUnique({
      where: { id: officialId },
      select: {
        id: true,
        ativo: true,
        company_id: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    if (!user.ativo) {
      throw new BadRequestException(
        'Usuário inativo não pode registrar marcações.',
      );
    }

    if (!user.company_id) {
      throw new BadRequestException(
        'Usuário não está vinculado a nenhuma empresa!',
      );
    }

    /**
     * 2️⃣ Validar empresa
     */
    const company = await this.prisma.companies.findUnique({
      where: { id: user.company_id },
      select: { id: true },
    });

    if (!company) {
      throw new BadRequestException('Empresa inválida ou inativa!');
    }

    /**
     * 3️⃣ Validar regras da empresa
     */
    const companyRules = await this.prisma.companyRules.findFirst({
      where: {
        company_id: company.id,
        valid_to: null,
      },
    });

    if (!companyRules) {
      throw new BadRequestException(
        'Empresa não possui regras de jornada configuradas!',
      );
    }

    /**
     * 4️⃣ Buscar última marcação existente
     */
    let lastType: PointMarkingsTypeEnum | null = null;

    const lastMarking = await this.prisma.pointMarkings.findFirst({
      where: { official_id: officialId },
      orderBy: { marked_at: 'desc' },
      select: { type: true },
    });

    if (lastMarking) {
      lastType = lastMarking.type as PointMarkingsTypeEnum;
    }

    /**
     * 5️⃣ Normalizar e validar sequência do lote
     */
    const markingsSorted = [...data.markings].sort(
      (a, b) =>
        new Date(a.marked_at).getTime() - new Date(b.marked_at).getTime(),
    );

    const dataToCreate = [] as any[];

    for (const marking of markingsSorted) {
      if (
        lastType === PointMarkingsTypeEnum.input &&
        marking.type === PointMarkingsTypeEnum.input
      ) {
        continue;
      }

      dataToCreate.push({
        official_id: officialId,
        type: marking.type as PointMarkingsTypeEnum,
        marked_at: new Date(marking.marked_at),
        lat: marking.lat,
        lgn: marking.lgn,
        origin: marking.origin,
      });

      lastType = marking.type as PointMarkingsTypeEnum;
    }

    /**
     * 6️⃣ Criar em lote
     */
    if (!dataToCreate.length) {
      return { synced: 0 };
    }

    await this.prisma.pointMarkings.createMany({
      data: dataToCreate,
    });

    return {
      synced: dataToCreate.length,
    };
  }
}
