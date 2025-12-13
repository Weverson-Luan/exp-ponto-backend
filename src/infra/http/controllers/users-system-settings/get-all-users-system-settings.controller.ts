/**
 * IMPORTS
 */
import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// domain / services
import { GetAllUsersSystemSettingsService } from '@src/domain/use-cases/users-system-settings/get-all-users-system-settings.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

// dtos
import { PaginationQueryUsersSystemSettingsDto } from '@src/core/shared/dtos/users-system-settings/pagination-query-create-users-system-settings.dto';

@ApiTags('Users System Settings')
@Controller('users-system-settings')
export class GetAllUsersSystemSettingsController {
  constructor(private readonly service: GetAllUsersSystemSettingsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Listar configurações do sistema!',
    description:
      'Ponto de extremidade responsável por listar configurações de sistema de usuários/empresas com paginação!',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de configurações retornada com sucesso!',
  })
  async list(@Query() query: PaginationQueryUsersSystemSettingsDto) {
    const result = await this.service.findAll(query);

    return formatResponse({
      message: 'Configurações do sistema listadas com sucesso!',
      statusCode: HttpStatus.OK,
      data: {
        total: result.total,
        totalPages: result.totalPages,
        page: result.page,
        limit: result.limit,
        items: result.data,
      },
    });
  }
}
