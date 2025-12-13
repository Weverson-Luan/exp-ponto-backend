/**
 * IMPORTS
 */
import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// domain / services
import { GetOnePointMarkingsService } from '@src/domain/use-cases/point-markings/get-one-point-markings.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

@ApiTags('Point Markings')
@Controller('point-markings')
export class GetOnePointMarkingsController {
  constructor(private readonly service: GetOnePointMarkingsService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Buscar marcação de ponto por ID!',
    description:
      'Ponto de extremidade responsável por buscar uma marcação de ponto pelo ID!',
  })
  @ApiResponse({
    status: 200,
    description: 'Marcação de ponto encontrada com sucesso!',
  })
  @ApiResponse({
    status: 404,
    description: 'Marcação de ponto não encontrada!',
  })
  async findOne(@Param('id') id: number) {
    const marking = await this.service.findOne(Number(id));

    return formatResponse({
      message: 'Marcação de ponto encontrada com sucesso!',
      statusCode: HttpStatus.OK,
      data: marking,
    });
  }
}
