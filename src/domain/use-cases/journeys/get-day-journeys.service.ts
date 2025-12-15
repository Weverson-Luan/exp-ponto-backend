/**
 * IMPORTS
 */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

// infra / database
import { PrismaService } from '../../../infra/database/prisma.service';

// repositories
import { JourneysRepository } from '@src/infra/repositories/journeys/journeys-repository';

/**
 * Sempre que criar uma classe com Injectable,
 * ela deve ser registrada no module (providers)
 */
@Injectable()
export class GetDayJourneysService {
  constructor(
    private readonly journeyRepo: JourneysRepository,
    private prisma: PrismaService,
  ) {}

  async execute(user_id: number, date: string) {
    if (!date) {
      throw new BadRequestException('Data não foi informada!');
    }

    if (!user_id) {
      throw new NotFoundException('ID Usuário não encontrado!');
    }

    const user = await this.prisma.users.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    const parsedDate = new Date(date);
    parsedDate.setHours(0, 0, 0, 0);

    return this.journeyRepo.findByUserAndDate(user_id, parsedDate);
  }
}
