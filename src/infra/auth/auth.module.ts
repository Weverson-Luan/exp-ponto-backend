/**
 * IMPORTS
 */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

// services / auth
import { AuthService } from './auth.service';

// services / prisma
import { PrismaService } from '../database/prisma.service';

// controller
import { AuthController } from './auth.controller';
// import { BcryptHasher } from "@src@srccore/shared/utils/cryptograpy";
import { BcryptHasher } from '@src/core/shared/utils/cryptograpy';
import { JwtStrategy } from './jwt.strategy';

// domain

  Module({
    imports: [
      JwtModule.register({
        global: true,
        secret: process.env.JWT_SECRET_KEY,
        signOptions: { expiresIn: '24h' },
      }),
    ],
    controllers: [AuthController],
    providers: [AuthService, PrismaService, BcryptHasher, JwtStrategy],
    exports: [AuthService],
  });
export class AuthModule {}
