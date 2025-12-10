/**
 * IMPORTS
 */
import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

// domain / service
import { CrateRolesService } from '@src/domain/use-cases/roles/create-roles.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';


// shared / dtos
import { CreateRoleDto } from '@src/core/shared/dtos/roles/create-roles.dto';

@ApiTags('Roles')
@Controller('roles')
export class CreateRolesController {
  constructor(private readonly rolesService: CrateRolesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova regra!' })
  @ApiResponse({ status: 201, description: 'Regra criada com sucesso!' })
  async create(@Body() body: CreateRoleDto) {
    const roles = await this.rolesService.create(body);

    return formatResponse({
      message: 'Criar uma nova regra!',
      statusCode: HttpStatus.CREATED,
      data: roles,
    });
  }
}
