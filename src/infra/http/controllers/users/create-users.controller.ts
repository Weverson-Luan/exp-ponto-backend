/**
 * IMPORTS
 */
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// domain / services
import { CreateUserservice } from '@src/domain/use-cases/users/create-users.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

// typings
import { UsersResponseSwagguerDto } from '@src/core/shared/dtos/users/create-users-swagguer.dto';
import { CreateUserDto } from '@src/core/shared/dtos/users/create-users.dtos';

@ApiTags('Users')
@Controller('users')
export class CreateUsersController {
  constructor(private usersService: CreateUserservice) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Criar um novo usuário!',
    description:
      'Ponto de extremidade responsável por registrar um novo usuário no sistema!',
  })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso!',
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação nos dados enviados!',
  })
  @ApiBody({ type: UsersResponseSwagguerDto })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    return formatResponse({
      message: 'Usuário criado com sucesso!',
      statusCode: HttpStatus.CREATED,
      data: user,
    });
  }
}
