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
import { UpdateJourneysService } from '@src/domain/use-cases/journeys/update-journeys.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

// dtos
import { UpdateJourneysDto } from '@src/core/shared/dtos/journeys/update-journeys.dto';

@ApiTags('Journeys')
@Controller('journeys')
export class UpdateJourneysController {
  constructor(private readonly service: UpdateJourneysService) {}

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Atualizar jornada!',
    description:
      'Ponto de extremidade responsável por atualizar os dados de uma jornada!',
  })
  @ApiResponse({
    status: 200,
    description: 'Jornada atualizada com sucesso!',
  })
  @ApiResponse({
    status: 404,
    description: 'Jornada não encontrada!',
  })
  @ApiBody({ type: UpdateJourneysDto })
  async update(@Param('id') id: number, @Body() dto: UpdateJourneysDto) {
    const journey = await this.service.update(Number(id), dto);

    return formatResponse({
      message: 'Jornada atualizada com sucesso!',
      statusCode: HttpStatus.OK,
      data: journey,
    });
  }
}
