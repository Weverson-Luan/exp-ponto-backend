/**
 * IMPORTS
 */
import {
  Controller,
  Body,
  Patch,
  Param,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

// infra / auth
import { JwtAuthGuard } from '@src/infra/auth/auth.guard';

// domain / use-cases
import { UpdateUsersService } from '@src/domain/use-cases/users/update-users.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

// shared / dtos
import { UpdateUserDto } from '@src/core/shared/dtos/users/update-roles.dto';

@ApiTags('Users')
@Controller('users')
export class UpdateUsersController {
  constructor(private readonly usersService: UpdateUsersService) {}

  @Patch(':user_id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Atualizar usuário existente!' })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso!',
  })
  async update(
    @Param('user_id') user_id: number,
    @Body() body: UpdateUserDto,
  ) {
    const user = await this.usersService.update(user_id, body);

    return formatResponse({
      message: 'Atualização do usuário!',
      statusCode: HttpStatus.OK,
      data: user,
    });
  }
}
