/**
 * IMPORTS
 */

import { Injectable, NotFoundException } from '@nestjs/common';

// services
import { PrismaService } from '../../../infra/database/prisma.service';

/**
 * Sempre que criar uma classe com o Injectable temos que informa-la
 * no module (providers)
 */
@Injectable()
export class GetOneUsersService {
  constructor(private prismaService: PrismaService) {}

  async findOne(user_id: number) {
    const user = await this.prismaService.users.findUnique({
      where: { id: user_id },
      select: {
        id: true,
        ativo: true,
        name: true,
        email: true,
        phone: true,
        document: true,
        rg: true,
        naturalness: true,
        father_name: true,
        mother_name: true,
        matriculation: true,
        birth_date: true,
        admission_date: true,
        dismissal_date: true,
        company_id: true,
        role_id: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${user_id} não encontrado!`);
    }

    return user;
  }
}
