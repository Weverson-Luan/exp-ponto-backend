/**
 * IMPORTS
 */
import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// domain / services
import { GetAllPointMarkingsService } from '@src/domain/use-cases/point-markings/get-all-point-markings.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

// dtos
import { PaginationQueryPointMarkingsDto } from '@src/core/shared/dtos/point-markings/pagination-query-point-markings.dto';

@ApiTags('Point Markings')
@Controller('point-markings')
export class GetAllPointMarkingsController {
  constructor(private readonly service: GetAllPointMarkingsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Listar marcações de ponto!',
    description:
      'Ponto de extremidade responsável por listar marcações de ponto com paginação!',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de marcações retornada com sucesso!',
  })
  async list(@Query() query: PaginationQueryPointMarkingsDto) {
    const result = await this.service.findAll(query);

    return formatResponse({
      message: 'Marcações listadas com sucesso!',
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
