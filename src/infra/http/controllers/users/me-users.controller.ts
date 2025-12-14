/**
 * IMPORTS
 */
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

// infra / auth
import { JwtAuthGuard } from '@src/infra/auth/auth.guard';

// domain / services
import { GetMeUsersService } from '@src/domain/use-cases/users/me-users.services';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';
import {
  CurrentUser,
  IResponseSub,
} from '@src/core/shared/decorators/current-user/current-user.decorator';

@ApiTags('Users')
@Controller('profile/users')
@UseGuards(JwtAuthGuard)
export class GetMeController {
  constructor(private readonly usersService: GetMeUsersService) {}

  @Get()
  @ApiOperation({ summary: 'Buscar informações do usuário logado!' })
  @ApiResponse({
    status: 200,
    description: 'Informações do usuário encontradas com sucesso!',
  })
  @HttpCode(HttpStatus.OK)
  async me(@CurrentUser() user: IResponseSub) {
    const session = await this.usersService.findOne(user.sub);

    return formatResponse({
      message: 'Sessão carregada com sucesso!',
      statusCode: HttpStatus.OK,
      data: session,
    });
  }
}
