/**
 * IMPORTS
 */
import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// domain / services
import { GetOneJourneysService } from '@src/domain/use-cases/journeys/get-one-journeys.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

@ApiTags('Journeys')
@Controller('journeys')
export class GetOneJourneysController {
  constructor(private readonly service: GetOneJourneysService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Buscar jornada por ID!',
    description:
      'Ponto de extremidade responsável por buscar uma jornada pelo ID!',
  })
  @ApiResponse({
    status: 200,
    description: 'Jornada encontrada com sucesso!',
  })
  @ApiResponse({
    status: 404,
    description: 'Jornada não encontrada!',
  })
  async findOne(@Param('id') id: number) {
    const journey = await this.service.findOne(Number(id));

    return formatResponse({
      message: 'Jornada encontrada com sucesso!',
      statusCode: HttpStatus.OK,
      data: journey,
    });
  }
}
