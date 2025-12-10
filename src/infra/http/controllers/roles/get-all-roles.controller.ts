/**
 * IMPORTS
 */
import {
  Controller,
  Get,
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

// service
import { GeAllRolesService } from '@src/domain/use-cases/roles/get-all-roles.service';
import { JwtAuthGuard } from '@src/infra/auth/auth.guard';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

// dtos
import { PaginationQueryRolesDto } from '@src/core/shared/dtos/roles/pagination-query-roles.dto';
import { RoleResponseDto } from '@src/core/shared/dtos/roles/roles-response.dto';

@ApiTags('Roles')
@Controller('roles')
export class GetAllRolesController {
  constructor(private readonly rolesService: GeAllRolesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Liste todas as regras com paginação!' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Lista de regras retornada com sucesso!',
    type: [RoleResponseDto],
  })
  async findAll(@Query() query: PaginationQueryRolesDto) {
    const roles = await this.rolesService.findAll(query);
    return formatResponse({
      message: 'A lista de funções foi retornada com sucesso!',
      statusCode: HttpStatus.OK,
      data: {
        total: roles.total,
        totalPages: roles.totalPages,
        page: roles.page,
        limit: roles.limit,
        items: roles.data,
      },
    });
  }
}
