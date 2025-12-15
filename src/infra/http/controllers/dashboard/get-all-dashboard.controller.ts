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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// domain / services
import { GetDashboardService } from '@src/domain/use-cases/dashboard/get-all-dashboard.service';

// infra / auth
import { JwtAuthGuard } from '@src/infra/auth/auth.guard';
import {
  CurrentUser,
  IResponseSub,
} from '@src/core/shared/decorators/current-user/current-user.decorator';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

@ApiTags('Dashboard')
@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class GetDashboardController {
  constructor(private readonly service: GetDashboardService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Buscar dados do dashboard',
    description:
      'Endpoint responsável por retornar os dados do dashboard do usuário logado!',
  })
  @ApiResponse({
    status: 200,
    description: 'Dados do dashboard retornados com sucesso!',
  })
  async getDashboard(
    @CurrentUser() user: IResponseSub,
    @Query('year') year: number,
    @Query('month') month: number,
  ) {
    const user_id = user?.sub ?? null;

    const result = await this.service.execute(user_id, year, month);

    return formatResponse({
      message: 'Dashboard carregado com sucesso!',
      statusCode: HttpStatus.OK,
      data: result,
    });
  }
}
