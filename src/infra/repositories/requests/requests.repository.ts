/**
 * IMPORTS
 */
import { Injectable } from '@nestjs/common';

// infra / database
import { PrismaService } from '@src/infra/database/prisma.service';
import { IRequestsRepository } from './requests-type.repository';

/**
 * Sempre que criar uma classe com Injectable,
 * ela deve ser registrada no module (providers)
 */
@Injectable()
export class RequestsRepository implements IRequestsRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Contagem de solicitações feitas pelo usuário
   * @param user_id
   * @returns
   */
  async countTotal(user_id: number): Promise<number> {
    return this.prisma.request.count({
      where: {
        user_id: user_id,
      },
    });
  }
}
