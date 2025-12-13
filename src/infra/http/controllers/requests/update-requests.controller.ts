/**
 * IMPORTS
 */
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// domain / services
import { UpdateRequestsService } from '@src/domain/use-cases/requests/update-requests.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

// dtos
import { UpdateRequestsDto } from '@src/core/shared/dtos/requests/update-requests.dto';

@ApiTags('Requests')
@Controller('requests')
export class UpdateRequestsController {
  constructor(private readonly service: UpdateRequestsService) {}

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Atualizar solicitação!',
    description:
      'Ponto de extremidade responsável por atualizar os dados de uma solicitação!',
  })
  @ApiResponse({
    status: 200,
    description: 'Solicitação atualizada com sucesso!',
  })
  @ApiResponse({
    status: 404,
    description: 'Solicitação não encontrada!',
  })
  @ApiBody({ type: UpdateRequestsDto })
  async update(@Param('id') id: number, @Body() dto: UpdateRequestsDto) {
    const request = await this.service.update(Number(id), dto);

    return formatResponse({
      message: 'Solicitação atualizada com sucesso!',
      statusCode: HttpStatus.OK,
      data: request,
    });
  }
}
