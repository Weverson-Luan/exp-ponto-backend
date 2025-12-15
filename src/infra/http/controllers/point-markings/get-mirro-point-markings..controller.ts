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
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import {
  CurrentUser,
  IResponseSub,
} from '@src/core/shared/decorators/current-user/current-user.decorator';

// domain / services
import { GetMirrorPointMarkingsService } from '@src/domain/use-cases/point-markings/get-mirro-point-markings.services';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';
import { JwtAuthGuard } from '@src/infra/auth/auth.guard';

@ApiTags('Point Markings')
@Controller('mirro')
@UseGuards(JwtAuthGuard)
export class GetMirrorPointMarkingsController {
  constructor(private readonly service: GetMirrorPointMarkingsService) {}

  @Get('point-markings')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Lista do espelho de pontos de marcação!',
    description:
      'Retorna todo o espelho de pontos de marcação do usuário logado para a data informada!',
  })
  @ApiQuery({
    name: 'date',
    required: true,
    example: '2025-12-28',
    description: 'Data no formato YYYY-MM-DD',
  })
  @ApiResponse({
    status: 200,
    description: 'Espelho de pontos de marcação retornados com sucesso!',
  })
  async mirroPointMarkings(
    @CurrentUser() user: IResponseSub,
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    const user_id = user?.sub ?? null;

    const markings = await this.service.execute(user_id, start, end);

    return formatResponse({
      message: 'Espelho de pontos de marcação retornados com sucesso!',
      statusCode: HttpStatus.OK,
      data: markings,
    });
  }
}
