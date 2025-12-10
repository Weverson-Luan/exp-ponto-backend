/**
 * IMPORTS
 */
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';

// infra / auth
import { JwtAuthGuard } from '@src/infra/auth/auth.guard';

// service
import { GetAllUsersService } from '@src/domain/use-cases/users/get-all-users.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

// dtos
import { UsersResponseSwagguerDto } from '@src/core/shared/dtos/users/create-users-swagguer.dto';
import { PaginationQueryUsersDto } from '@src/core/shared/dtos/users/pagination-query-users.dto';

@ApiTags('Users')
@Controller('users')
export class GetAllUsersController {
  constructor(private readonly usersService: GetAllUsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Listar todos os usuários com paginação!' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'A lista de usuários foi retornada com sucesso!',
    type: [UsersResponseSwagguerDto],
  })
  async findAll(@Query() query: PaginationQueryUsersDto) {
    const users = await this.usersService.findAll(query);

    return formatResponse({
      message: 'A lista de usuários foi retornada com sucesso!',
      statusCode: HttpStatus.OK,
      data: {
        total: users.total,
        totalPages: users.totalPages,
        page: users.page,
        limit: users.limit,
        items: users.data,
      },
    });
  }
}
