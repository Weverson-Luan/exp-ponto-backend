/**
 * IMPORTS
 */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignInSwagguerDTO } from '@src/core/shared/dtos/auth/auth-swagguer.dtos';
import { type SignInDTO } from '@src/core/shared/dtos/auth/auth.dtos';

// typings
import { AuthService } from '@src/infra/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  @ApiOperation({
    summary: 'Log in',
    description:
      'Endpoint responsável por autenticar o usuário e retornar um token JWT.',
  })
  @ApiResponse({
    status: 200,
    description:
      'Login realizado com sucesso. Retorna o token JWT e dados do usuário.',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: '123',
          nome: 'João da Silva',
          email: 'luansousa@srcemail.com',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas',
  })
  @ApiBody({ type: SignInSwagguerDTO })
  async signin(@Body() body: SignInDTO) {
    return await this.authService.signIn(body);
  }
}
