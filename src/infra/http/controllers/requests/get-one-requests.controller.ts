/**
 * IMPORTS
 */
import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// domain / services
import { GetOneRequestsService } from '@src/domain/use-cases/requests/get-one-requests.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

@ApiTags('Requests')
@Controller('requests')
export class GetOneRequestsController {
  constructor(private readonly service: GetOneRequestsService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Buscar solicitação por ID!',
    description:
      'Ponto de extremidade responsável por buscar uma solicitação pelo ID!',
  })
  @ApiResponse({
    status: 200,
    description: 'Solicitação encontrada com sucesso!',
  })
  @ApiResponse({
    status: 404,
    description: 'Solicitação não encontrada!',
  })
  async findOne(@Param('id') id: number) {
    const request = await this.service.findOne(Number(id));

    return formatResponse({
      message: 'Solicitação encontrada com sucesso!',
      statusCode: HttpStatus.OK,
      data: request,
    });
  }
}
