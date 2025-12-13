/**
 * IMPORTS
 */
import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// domain / services
import { DeleteUsersSystemSettingsService } from '@src/domain/use-cases/users-system-settings/delete-users-system-settings.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

@ApiTags('Users System Settings')
@Controller('users-system-settings')
export class DeleteUsersSystemSettingsController {
  constructor(private readonly service: DeleteUsersSystemSettingsService) {}

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Excluir configurações do sistema!',
    description:
      'Ponto de extremidade responsável por remover as configurações de sistema de um usuário ou empresa!',
  })
  @ApiResponse({
    status: 200,
    description: 'Configurações removidas com sucesso!',
  })
  @ApiResponse({
    status: 404,
    description: 'Configurações não encontradas!',
  })
  async delete(@Param('id') id: number) {
    const result = await this.service.execute(Number(id));

    return formatResponse({
      message: 'Configurações do sistema removidas com sucesso!',
      statusCode: HttpStatus.OK,
      data: result,
    });
  }
}
