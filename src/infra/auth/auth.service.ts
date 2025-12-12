/**
 * IMPORTS
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

// database
import { PrismaService } from '../database/prisma.service';

// shared / utils
import { BcryptHasher } from '@src/core/shared/utils/cryptograpy';

// dtos / auth
import { SignInDTO } from '@src/core/shared/dtos/auth/auth.dtos';

/**
 * Sempre que criar uma classe com Injectable,
 * ela deve ser registrada no module (providers)
 */
@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private bcryptHasher: BcryptHasher,
    private jwtService: JwtService,
  ) {}
  async signIn(data: SignInDTO) {
    const user = await this.prismaService.users.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User with invalid email or password!');
    }

    // const role = await this.prismaService.roles.findUnique({
    //   where: {
    //     id: user.id,
    //   },
    // });

    const correctPassword = await this.bcryptHasher.compare(
      data.password,
      user.password!,
    );

    if (!correctPassword) {
      throw new UnauthorizedException('Invalid email or password!');
    }

    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return {
      message: 'Login successful!',
      statusCode: 201,
      access_token: token,
      user: {
        id: user.id,
        nome: user.name,
        email: user.email,
        role: null,
      },
    };
  }
}
