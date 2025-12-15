/**
 * IMPORTS
 */
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// infra / auth
import { JwtAuthGuard } from '@src/infra/auth/auth.guard';

// domain / services
import { SyncPointMarkingsService } from '@src/domain/use-cases/point-markings/sync-point-markings.service';

// shared
import { formatResponse } from '@src/core/shared/utils/format-response';

import {
  CurrentUser,
  IResponseSub,
} from '@src/core/shared/decorators/current-user/current-user.decorator';

// dtos
import { SyncPointMarkingsDto } from '@src/core/shared/dtos/point-markings/sync-point-markings.dto';

@ApiTags('Point Markings')
@Controller('sync')
@UseGuards(JwtAuthGuard)
export class SyncPointMarkingsController {
  constructor(
    private readonly syncPointMarkingsService: SyncPointMarkingsService,
  ) {}

  @Post('point-markings')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Registrar ponto',
    description:
      'Ponto de extremidade responsável por registrar uma marcação de ponto do usuário logado.',
  })
  @ApiResponse({
    status: 201,
    description: 'Marcação registrada com sucesso!',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação ou regra de negócio.',
  })
  @ApiBody({ type: SyncPointMarkingsDto })
  async create(
    @CurrentUser() user: IResponseSub,
    @Body() body: SyncPointMarkingsDto[],
  ) {
    const pointMarking = await this.syncPointMarkingsService.execute(
      user.sub,
      body as any,
    );

    return formatResponse({
      message: 'Marcação de ponto registrada com sucesso!',
      statusCode: HttpStatus.CREATED,
      data: pointMarking,
    });
  }
}
