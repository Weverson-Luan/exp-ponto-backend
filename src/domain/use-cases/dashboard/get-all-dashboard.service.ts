/**
 * IMPORTS
 */
import { BadRequestException, Injectable } from '@nestjs/common';

// dtos
import { BankHoursRepository } from '@src/infra/repositories/back-hours/bank-hours.repository';
import { RequestsRepository } from '@src/infra/repositories/requests/requests.repository';
import { JourneysRepository } from '@src/infra/repositories/journeys/journeys-repository';

/**
 * Sempre que criar uma classe com Injectable,
 * ela deve ser registrada no module (providers)
 */
@Injectable()
export class GetDashboardService {
  constructor(
    private readonly journeysRepo: JourneysRepository,
    private readonly requestsRepo: RequestsRepository,
  ) {}

  async execute(user_id: number, year: number, month: number) {
    if (!year || !month) {
      throw new BadRequestException('Ano e mês são obrigatórios!');
    }

    const referenceDate = new Date(year, month - 1, 1);

    const [bankHours, requests, occurrences, absences] = await Promise.all([
      this.journeysRepo.getBankHours(user_id, referenceDate),
      this.requestsRepo.countTotal(user_id),
      this.journeysRepo.countOccurrences(user_id, referenceDate),
      this.journeysRepo.countAbsences(user_id, referenceDate),
    ]);

    return {
      bank_hours: {
        balance: bankHours,
      },
      requests: {
        total: requests,
      },
      occurrences: {
        total: occurrences,
      },
      absences: {
        month: absences,
      },
      point_cards: {
        available: true,
      },
    };
  }
}
