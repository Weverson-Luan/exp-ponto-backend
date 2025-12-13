/**
 * IMPORTS
 */
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// domain / services
import { CreateJourneysService } from '@src/domain/use-cases/journeys/create-journeys.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

// dtos
import { CreateJourneyDto } from '@src/core/shared/dtos/journeys/create-journeys.dto';

@ApiTags('Journeys')
@Controller('journeys')
export class CreateJourneysController {
  constructor(private readonly service: CreateJourneysService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Criar jornada!',
    description:
      'Ponto de extremidade responsável por registrar a jornada diária de um usuário!',
  })
  @ApiResponse({
    status: 201,
    description: 'Jornada criada com sucesso!',
  })
  @ApiBody({ type: CreateJourneyDto })
  async create(@Body() data: CreateJourneyDto) {
    const journey = await this.service.create(data);

    return formatResponse({
      message: 'Jornada criada com sucesso!',
      statusCode: HttpStatus.CREATED,
      data: journey,
    });
  }
}
