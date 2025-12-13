/**
 * IMPORTS
 */
import { Injectable, NotFoundException } from '@nestjs/common';

// services
import { PrismaService } from '../../../infra/database/prisma.service';

// dtos
import { UpdateRequestsDto } from '@src/core/shared/dtos/requests/update-requests.dto';

/**
 * Sempre que criar uma classe com Injectable,
 * ela deve ser registrada no module (providers)
 */
@Injectable()
export class UpdateRequestsService {
  constructor(private prisma: PrismaService) {}

  async update(id: number, data: UpdateRequestsDto) {
    const exists = await this.prisma.request.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException('Solicitação não encontrada!');
    }

    return this.prisma.request.update({
      where: { id },
      data: {
        user_id: data.user_id,
        company_id: data.company_id,
        type: data.type,
        reason: data.reason,
        status: data.status ?? 'PENDING',
        requestDate: new Date(data.requestDate!),
        attachmentUrl: data.attachmentUrl,
      },
    });
  }
}
