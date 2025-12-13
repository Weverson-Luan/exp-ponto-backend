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
import { UpdatePointMarkingsService } from '@src/domain/use-cases/point-markings/update-point-markings.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

// dtos
import { UpdatePointMarkingsDto } from '@src/core/shared/dtos/point-markings/update-point-markings.dto';

@ApiTags('Point Markings')
@Controller('point-markings')
export class UpdatePointMarkingsController {
  constructor(private readonly service: UpdatePointMarkingsService) {}

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Atualizar marcação de ponto!',
    description:
      'Ponto de extremidade responsável por atualizar uma marcação de ponto!',
  })
  @ApiResponse({
    status: 200,
    description: 'Marcação de ponto atualizada com sucesso!',
  })
  @ApiResponse({
    status: 404,
    description: 'Marcação de ponto não encontrada!',
  })
  @ApiBody({ type: UpdatePointMarkingsDto })
  async update(@Param('id') id: number, @Body() dto: UpdatePointMarkingsDto) {
    const marking = await this.service.update(Number(id), dto);

    return formatResponse({
      message: 'Marcação de ponto atualizada com sucesso!',
      statusCode: HttpStatus.OK,
      data: marking,
    });
  }
}
