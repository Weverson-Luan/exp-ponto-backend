/**
 * IMPORTS
 */
import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// domain / services
import { GetAllJourneysService } from '@src/domain/use-cases/journeys/get-all-journeys.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

// dtos
import { PaginationQueryJourneysDto } from '@src/core/shared/dtos/journeys/pagination-query-journeys.dto';

@ApiTags('Journeys')
@Controller('journeys')
export class GetAllJourneysController {
  constructor(private readonly service: GetAllJourneysService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Listar jornadas!',
    description:
      'Ponto de extremidade responsável por listar jornadas com paginação!',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de jornadas retornada com sucesso!',
  })
  async list(@Query() query: PaginationQueryJourneysDto) {
    const result = await this.service.findAll(query);

    return formatResponse({
      message: 'Jornadas listadas com sucesso!',
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
