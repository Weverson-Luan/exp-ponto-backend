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
import { UpdateUsersSystemSettingsService } from '@src/domain/use-cases/users-system-settings/update-users-system-settings.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

// dtos
import { UpdateUsersSystemSettingsDto } from '@src/core/shared/dtos/users-system-settings/update-create-users-system-settings.dto';

@ApiTags('Users System Settings')
@Controller('users-system-settings')
export class UpdateUsersSystemSettingsController {
  constructor(private readonly service: UpdateUsersSystemSettingsService) {}

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Atualizar configurações do sistema!',
    description:
      'Ponto de extremidade responsável por atualizar as configurações de sistema de um usuário ou empresa!',
  })
  @ApiResponse({
    status: 200,
    description: 'Configurações atualizadas com sucesso!',
  })
  @ApiResponse({
    status: 404,
    description: 'Configurações não encontradas!',
  })
  @ApiBody({ type: UpdateUsersSystemSettingsDto })
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateUsersSystemSettingsDto,
  ) {
    const settings = await this.service.update(Number(id), dto);

    return formatResponse({
      message: 'Configurações do sistema atualizadas com sucesso!',
      statusCode: HttpStatus.OK,
      data: settings,
    });
  }
}
