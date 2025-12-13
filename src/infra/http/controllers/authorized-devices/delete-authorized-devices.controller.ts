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
import { DeleteAuthorizedDevicesService } from '@src/domain/use-cases/authorized-devices/delete-authorized-devices.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

@ApiTags('Authorized Devices')
@Controller('authorized-devices')
export class DeleteAuthorizedDevicesController {
  constructor(private readonly service: DeleteAuthorizedDevicesService) {}

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Excluir dispositivo autorizado!',
    description:
      'Ponto de extremidade responsável por remover um dispositivo autorizado do sistema!',
  })
  @ApiResponse({
    status: 200,
    description: 'Dispositivo autorizado removido com sucesso!',
  })
  @ApiResponse({
    status: 404,
    description: 'Dispositivo autorizado não encontrado!',
  })
  async delete(@Param('id') id: number) {
    const result = await this.service.execute(Number(id));

    return formatResponse({
      message: 'Dispositivo autorizado removido com sucesso!',
      statusCode: HttpStatus.OK,
      data: result,
    });
  }
}
