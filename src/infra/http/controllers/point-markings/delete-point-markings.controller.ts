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
import { DeletePointMarkingsService } from '@src/domain/use-cases/point-markings/delete-point-markings.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

@ApiTags('Point Markings')
@Controller('point-markings')
export class DeletePointMarkingsController {
  constructor(private readonly service: DeletePointMarkingsService) {}

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Remover marcação de ponto!',
    description:
      'Ponto de extremidade responsável por remover uma marcação de ponto do sistema!',
  })
  @ApiResponse({
    status: 200,
    description: 'Marcação de ponto removida com sucesso!',
  })
  @ApiResponse({
    status: 404,
    description: 'Marcação de ponto não encontrada!',
  })
  async delete(@Param('id') id: number) {
    const result = await this.service.execute(Number(id));

    return formatResponse({
      message: 'Marcação de ponto removida com sucesso!',
      statusCode: HttpStatus.OK,
      data: result,
    });
  }
}
