/**
 * IMPORTS
 */
import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// domain / services
import { DeleteRequestsService } from '@src/domain/use-cases/requests/delete-requests.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

@ApiTags('Requests')
@Controller('requests')
export class DeleteRequestsController {
  constructor(private readonly service: DeleteRequestsService) {}

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Excluir solicitação!',
    description:
      'Ponto de extremidade responsável por remover uma solicitação do sistema!',
  })
  @ApiResponse({
    status: 200,
    description: 'Solicitação removida com sucesso!',
  })
  @ApiResponse({
    status: 404,
    description: 'Solicitação não encontrada!',
  })
  async delete(@Param('id') id: number) {
    const result = await this.service.execute(Number(id));

    return formatResponse({
      message: 'Solicitação removida com sucesso!',
      statusCode: HttpStatus.OK,
      data: result,
    });
  }
}
