/**
 * IMPORTS
 */
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// domain / services
import { CreateUsersSystemSettingsService } from '@src/domain/use-cases/users-system-settings/create-users-system-settings.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

// dtos
import { CreateUsersSystemSettingsDto } from '@src/core/shared/dtos/users-system-settings/create-create-users-system-settings.dto';

@ApiTags('Users System Settings')
@Controller('users-system-settings')
export class CreateUsersSystemSettingsController {
  constructor(private readonly service: CreateUsersSystemSettingsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Criar configurações do sistema do usuário!',
    description:
      'Ponto de extremidade responsável por registrar as configurações de sistema do usuário ou da empresa.',
  })
  @ApiResponse({
    status: 201,
    description: 'Configurações criadas com sucesso!',
  })
  @ApiBody({ type: CreateUsersSystemSettingsDto })
  async create(@Body() data: CreateUsersSystemSettingsDto) {
    const settings = await this.service.create(data);

    return formatResponse({
      message: 'Configurações do sistema criadas com sucesso!',
      statusCode: HttpStatus.CREATED,
      data: settings,
    });
  }
}
