/**
 * IMPORTS
 */
import { Injectable } from '@nestjs/common';

// services
import { PrismaService } from '../../../infra/database/prisma.service';

// dtos
import { CreateRequestsDto } from '@src/core/shared/dtos/requests/create-requests.dto';

/**
 * Sempre que criar uma classe com o Injectable temos que informa-la
 * no module (providers)
 */
@Injectable()
export class CreateRequestsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateRequestsDto) {
    return this.prisma.request.create({
      data: {
        user_id: data.user_id,
        company_id: data.company_id,
        type: data.type,
        reason: data.reason,
        status: data.status ?? 'PENDING',
        request_date: new Date(data.requestDate),
        attachmentUrl: data.attachmentUrl,
      },
    });
  }
}
