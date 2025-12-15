/**
 * IMPORTS
 */
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

// domain / service
import { GetDayJourneysService } from '@src/domain/use-cases/journeys/get-day-journeys.service';

// infra / auth
import { JwtAuthGuard } from '@src/infra/auth/auth.guard';

// decorators / authication
import {
  CurrentUser,
  IResponseSub,
} from '@src/core/shared/decorators/current-user/current-user.decorator';

// shared
import { formatResponse } from '@src/core/shared/utils/format-response';

@ApiTags('Journeys')
@Controller('day')
@UseGuards(JwtAuthGuard)
export class GetDayJourneysController {
  constructor(private readonly service: GetDayJourneysService) {}

  @Get('journeys')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Buscar jornada do dia!',
    description:
      'Retorna a jornada consolidada do usuário logado para a data informada!',
  })
  @ApiQuery({
    name: 'date',
    required: true,
    example: '2025-12-15',
  })
  @ApiResponse({
    status: 200,
    description: 'Jornada retornada com sucesso!',
  })
  async getDay(@CurrentUser() user: IResponseSub, @Query('date') date: string) {
    const journeys = await this.service.execute(user?.sub, date);

    return formatResponse({
      message: 'Jornada do dia retornada com sucesso!',
      statusCode: HttpStatus.OK,
      data: journeys,
    });
  }
}
