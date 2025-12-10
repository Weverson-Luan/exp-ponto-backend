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
import { DeleteOneRoleByService } from '@src/domain/use-cases/roles/delete-roles.service';

// shared / dtos
import { formatResponse } from '@src/core/shared/utils/format-response';

@ApiTags('Roles')
@Controller('roles')
export class DeleteOneRolesController {
  constructor(private readonly rolesService: DeleteOneRoleByService) {}

  @Delete(':role_id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Excluir regra existente!' })
  @ApiResponse({ status: 200, description: 'Excluir regra com sucesso!' })
  async delete(@Param('role_id') role_id: number) {
    const roles = await this.rolesService.delete(role_id);

    return formatResponse({
      message: 'Excluir regra com sucesso!',
      statusCode: HttpStatus.OK,
      data: roles,
    });
  }
}
