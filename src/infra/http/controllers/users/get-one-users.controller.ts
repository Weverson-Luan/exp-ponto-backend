/**
 * IMPORTS
 */
import {
  Controller,
  Get,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

// infra / auth
import { JwtAuthGuard } from '@src/infra/auth/auth.guard';

// domain / services
import { GetOneUsersService } from '@src/domain/use-cases/users/get-one-users.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

@ApiTags('Users')
@Controller('users')
export class GetOneUsersController {
  constructor(private readonly usersService: GetOneUsersService) {}

  @Get(':user_id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Pesquisar usuário por ID!' })
  @ApiParam({ name: 'user_id', description: 'ID do usuário!' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado!' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado!' })
  async findOne(@Param('user_id') user_id: number) {
    const user = await this.usersService.findOne(user_id);

    return formatResponse({
      message: 'User found!',
      statusCode: HttpStatus.OK,
      data: user,
    });
  }
}
