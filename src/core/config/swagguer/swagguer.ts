/**
 * IMPORTS
 */
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SetupSwagger {
  constructor(private app: INestApplication) {}

  build() {
    const config = new DocumentBuilder()

      .setTitle((process.env?.SWAGGER_TITLE as string) ?? 'Ponto API')
      .setDescription(
        process.env.SWAGGER_DESCRIPTION ?? 'Documentação da API do Ponto.',
      )
      .setVersion(process.env.SWAGGER_VERSION ?? '1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'Authorization',
          description: 'Informe o token JWT no formato: Bearer {token}',
          in: 'header',
        },
        'access-token',
      )
      .build();

    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup(process.env.SWAGGER_PATH ?? 'docs', this.app, document);
  }
}
