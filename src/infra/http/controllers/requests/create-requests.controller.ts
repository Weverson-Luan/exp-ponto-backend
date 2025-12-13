/**
 * IMPORTS
 */
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// domain / services
import { CreateRequestsService } from '@src/domain/use-cases/requests/create-requests.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

// dtos
import { CreateRequestsDto } from '@src/core/shared/dtos/requests/create-requests.dto';

@ApiTags('Requests')
@Controller('requests')
export class CreateRequestsController {
  constructor(private readonly service: CreateRequestsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Criar solicitação!',
    description:
      'Ponto de extremidade responsável por criar uma solicitação (abono, ajuste ou avulsa).',
  })
  @ApiResponse({
    status: 201,
    description: 'Solicitação criada com sucesso!',
  })
  @ApiBody({ type: CreateRequestsDto })
  async create(@Body() data: CreateRequestsDto) {
    const request = await this.service.create(data);

    return formatResponse({
      message: 'Solicitação criada com sucesso!',
      statusCode: HttpStatus.CREATED,
      data: request,
    });
  }
}
