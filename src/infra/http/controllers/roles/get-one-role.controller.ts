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
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

// service
import { GetOneRoleByIdService } from '@src/domain/use-cases/roles/get-one-roles.service';

// infra / auth
import { JwtAuthGuard } from '@src/infra/auth/auth.guard';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

// shared / dtos
import { RoleResponseDto } from '@src/core/shared/dtos/roles/roles-response.dto';

@ApiTags('Roles')
@Controller('roles')
export class GetOneRolesController {
  constructor(private readonly getRoleById: GetOneRoleByIdService) {}

  @Get(':role_id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Pesquisar função por ID!' })
  @ApiParam({ name: 'role_id', description: 'ID da role!', required: true })
  @ApiResponse({
    status: 200,
    description: 'Regra encontrada!',
    type: RoleResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Regra não encontrada!' })
  async findOne(@Param('role_id') role_id: number) {
    const role = await this.getRoleById.findOne(role_id);

    return formatResponse({
      message: 'Regra encontrada!',
      statusCode: HttpStatus.OK,
      data: role,
    });
  }
}
