/**
 * IMPORTS
 */
import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// domain / services
import { GetOneUsersSystemSettingsService } from '@src/domain/use-cases/users-system-settings/get-one-users-system-settings.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

@ApiTags('Users System Settings')
@Controller('users-system-settings')
export class GetOneUsersSystemSettingsController {
  constructor(private readonly service: GetOneUsersSystemSettingsService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Buscar configurações do sistema por ID!',
    description:
      'Ponto de extremidade responsável por buscar as configurações de sistema de um usuário ou empresa pelo ID!',
  })
  @ApiResponse({
    status: 200,
    description: 'Configurações encontradas com sucesso!',
  })
  @ApiResponse({
    status: 404,
    description: 'Configurações não encontradas!',
  })
  async findOne(@Param('id') id: number) {
    const settings = await this.service.findOne(Number(id));

    return formatResponse({
      message: 'Configurações do sistema encontradas com sucesso!',
      statusCode: HttpStatus.OK,
      data: settings,
    });
  }
}
