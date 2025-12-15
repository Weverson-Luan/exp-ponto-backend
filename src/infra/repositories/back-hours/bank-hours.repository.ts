/**
 * IMPORTS
 */
import { Injectable } from '@nestjs/common';

// infra / database
import { PrismaService } from '@src/infra/database/prisma.service';

/**
 * Sempre que criar uma classe com Injectable,
 * ela deve ser registrada no module (providers)
 */
@Injectable()
export class BankHoursRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getBalance(userId: number): Promise<string> {
    // versão inicial simples
    // depois pode vir de tabela bank_hours
    return '00:00';
  }
}
