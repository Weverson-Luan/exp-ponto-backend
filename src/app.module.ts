/**
 * IMPORTS
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// infra auth / controllers
import { AuthModule } from './infra/auth/auth.module';

// infra http / controllers
import { HttpModule } from './infra/http/http.module';

// config / env
import { envSchema } from './core/config/env';

  @Module({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env',
        validate: (env) => envSchema.parse(env),
      }),

      AuthModule,
      HttpModule,
    ],
  })


/**
 * EXPORTS
 */
export class AppModule {}

