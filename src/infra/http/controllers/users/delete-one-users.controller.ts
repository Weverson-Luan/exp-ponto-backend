/**
 * IMPORTS
 */
import {
  Controller,
  Param,
  HttpStatus,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

// infra / auth
import { JwtAuthGuard } from '@src/infra/auth/auth.guard';

// domain / use-cases
import { DeleteOneUsersByService } from '@src/domain/use-cases/users/delete-one-users.service';

// shared / dtos
import { formatResponse } from '@src/core/shared/utils/format-response';

@ApiTags('Users')
@Controller('users')
export class DeleteOneUsersController {
  constructor(private readonly userService: DeleteOneUsersByService) {}

  @Delete(':user_id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Excluir usuário existente!' })
  @ApiResponse({ status: 200, description: 'Usuário excluido com sucesso!' })
  async delete(@Param('user_id') user_id: number) {
    const roles = await this.userService.delete(user_id);

    return formatResponse({
      message: 'Usuário excluido com sucesso!',
      statusCode: HttpStatus.OK,
      data: roles,
    });
  }
}
