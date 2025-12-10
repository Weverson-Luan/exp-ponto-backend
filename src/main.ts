/**
 * IMPORTS
 */
import { NestFactory } from '@nestjs/core';

// module
import { AppModule } from './app.module';

// config
import { SetupSwagger } from './core/config/swagguer/swagguer';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Env } from './core/config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*', // libera acesso de qualquer origem
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    },
  });

  const configService = app.get<ConfigService<Env, true>>(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.setGlobalPrefix('api');

  new SetupSwagger(app).build();

  const port = configService.get('PORT', { infer: true });
  await app.listen(port ?? 3001);
}

bootstrap();
