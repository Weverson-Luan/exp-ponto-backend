/**
 * IMPORTS
 */
import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// domain / services
import { GetAllRequestsService } from '@src/domain/use-cases/requests/get-all-requests.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

// dtos
import { PaginationQueryRequestsDto } from '@src/core/shared/dtos/requests/pagination-query-requests.dto';

@ApiTags('Requests')
@Controller('requests')
export class GetAllRequestsController {
  constructor(private readonly service: GetAllRequestsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Listar solicitações!',
    description:
      'Ponto de extremidade responsável por listar solicitações com paginação!',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de solicitações retornada com sucesso!',
  })
  async list(@Query() query: PaginationQueryRequestsDto) {
    const result = await this.service.findAll(query);

    return formatResponse({
      message: 'Solicitações listadas com sucesso!',
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
