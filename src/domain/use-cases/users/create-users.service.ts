/**
 * IMPORTS
 */

import { ConflictException, Injectable } from '@nestjs/common';

// services
import { PrismaService } from '../../../infra/database/prisma.service';

// domain
import { BcryptHasher } from '../../../core/shared/utils/cryptograpy';

// typings
import { CreateUserDto } from '../../../core/shared/dtos/users/create-users.dtos';

/**
 * Sempre que criar uma classe com o Injectable temos que informa-la
 * no module (providers)
 */
@Injectable()
export class CreateUserservice {
  constructor(
    private prismaService: PrismaService,
    private bcryptHasher: BcryptHasher,
  ) {}

  async create(data: CreateUserDto) {
    const userAlreadyExists = await this.prismaService.users.findFirst({
      where: {
        OR: [{ email: data.email }, { phone: data.phone }],
      },
    });

    if (userAlreadyExists) {
      if (userAlreadyExists.phone === data.phone) {
        throw new ConflictException('Telefone já cadastrado!');
      }
      if (userAlreadyExists.email === data.email) {
        throw new ConflictException('E-mail já cadastrado!');
      }
    }

    const role = await this.prismaService.roles.findFirst({
      where: {
        id: Number(data.role_id),
      },
    });

    if (!role) {
      throw new ConflictException('A regra com o ID não existe!');
    }

    const encryptedPassword = await this.bcryptHasher.hash(data.password!);

    const userCreated = await this.prismaService.users.create({
      data: {
        name: data.name,
        email: data.email!,
        ativo: data.ativo,
        password: encryptedPassword,
        phone: data.phone,
        document: data.document,
        rg: data.rg,
        naturalness: data.naturalness,
        father_name: data.father_name,
        mother_name: data.mother_name,
        matriculation: data.matriculation,
        admission_date: data.admission_date
          ? new Date(data.admission_date)
          : null,

        dismissal_date: data.dismissal_date
          ? new Date(data.dismissal_date)
          : null,
        role_id: Number(data.role_id),
        company_id: Number(data.company_id),
        birth_date: new Date(data.birth_date!),
      },
    });

    const { password, ...userWithoutPassword } = userCreated;

    return userWithoutPassword;
  }
}
