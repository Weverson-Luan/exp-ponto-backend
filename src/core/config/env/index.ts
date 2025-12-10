import { z } from 'zod';

import 'dotenv/config';

/*
  Este arquivo Valida as variáveis de ambiente mais importantes e/ou as que estão sendo utilizadas atualmente.
  Adicione novas variáveis e as valide, caso seja necessário.
 */
export const envSchema = z
  .object({
    // DB
    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_HOST: z.string(),
    POSTGRES_PORT: z.coerce.number(),
    POSTGRES_DB: z.string(),
    PORT: z.coerce.number().default(3001),
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),

    // JWT
    JWT_SECRET_KEY: z.string(),
    JWT_EXPIRES_IN: z.string().default('24h'),
  })
  .transform((data) => ({
    ...data,
    // valida a url do banco de dados postgreSQL
    DATABASE_URL: `postgresql://${data.POSTGRES_USER}:${data.POSTGRES_PASSWORD}src/${data.POSTGRES_HOST}:${data.POSTGRES_PORT}/${data.POSTGRES_DB}?schema=public`,
  }));

export type Env = z.infer<typeof envSchema>;

// valida explicitamente as variáveis de ambiente
const _env = envSchema.safeParse({
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_DB: process.env.POSTGRES_DB,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
});

if (_env.success === false) {
  if (process.env.NODE_ENV === 'development') {
    console.error('❌ Erro ao validar variáveis de ambiente!');
  }
  throw new Error('❌ Variáveis de ambiente inválidas!');
}

export const env = _env.data;
