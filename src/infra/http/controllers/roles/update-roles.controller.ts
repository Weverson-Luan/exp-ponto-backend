/**
 * IMPORTS
 */
import {
  Controller,
  Body,
  Patch,
  UseGuards,
  Param,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

// domain / services
import { UpdateRolesService } from '@src/domain/use-cases/roles/upadte-roles.service';

// infra / auth
import { JwtAuthGuard } from '@src/infra/auth/auth.guard';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

// shared / dtos
import { UpdateRoleDto } from '@src/core/shared/dtos/roles/update-roles.dto';

@ApiTags('Update Roles')
@Controller('roles')
export class UpdateRolesController {
  constructor(private readonly rolesService: UpdateRolesService) {}

  @Patch(':role_id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Atualizar uma regra existente!' })
  @ApiResponse({ status: 200, description: 'Regra atualizada com sucesso!' })
  async update(
    @Param('role_id') role_id: number,
    @Body() body: UpdateRoleDto,
  ) {
    const role = await this.rolesService.update(role_id, body);

    return formatResponse({
      message: 'Regra atualizada com sucesso!',
      statusCode: HttpStatus.OK,
      data: role,
    });
  }
}
