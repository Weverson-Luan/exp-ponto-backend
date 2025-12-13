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
import { DeleteJourneysService } from '@src/domain/use-cases/journeys/delete-journeys.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

@ApiTags('Journeys')
@Controller('journeys')
export class DeleteJourneysController {
  constructor(private readonly service: DeleteJourneysService) {}

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Excluir jornada!',
    description:
      'Ponto de extremidade responsável por remover uma jornada do sistema!',
  })
  @ApiResponse({
    status: 200,
    description: 'Jornada removida com sucesso!',
  })
  @ApiResponse({
    status: 404,
    description: 'Jornada não encontrada!',
  })
  async delete(@Param('id') id: number) {
    const result = await this.service.execute(Number(id));

    return formatResponse({
      message: 'Jornada removida com sucesso!',
      statusCode: HttpStatus.OK,
      data: result,
    });
  }
}
