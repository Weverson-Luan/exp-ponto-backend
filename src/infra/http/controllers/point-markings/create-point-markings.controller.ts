/**
 * IMPORTS
 */
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// domain / services
import { CreatePointMarkingsService } from '@src/domain/use-cases/point-markings/create-point-markings.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

// dtos
import { CreatePointMarkingsDto } from '@src/core/shared/dtos/point-markings/create-point-markings.dto';

@ApiTags('Point Markings')
@Controller('point-markings')
export class CreatePointMarkingsController {
  constructor(private readonly service: CreatePointMarkingsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Registrar marcação de ponto!',
    description:
      'Ponto de extremidade responsável por registrar uma marcação de ponto!',
  })
  @ApiResponse({
    status: 201,
    description: 'Marcação de ponto registrada com sucesso!',
  })
  @ApiBody({ type: CreatePointMarkingsDto })
  async create(@Body() data: CreatePointMarkingsDto) {
    const pointMarkings = await this.service.create(data);

    return formatResponse({
      message: 'Marcação de ponto registrada com sucesso!',
      statusCode: HttpStatus.CREATED,
      data: pointMarkings,
    });
  }
}
