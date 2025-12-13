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
import { UpdateAuthorizedDevicesService } from '@src/domain/use-cases/authorized-devices/update-authorized-devices.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

// dtos
import { UpdateAuthorizedDevicesDto } from '@src/core/shared/dtos/authorized-devices/update-authorized-devices.dto';

@ApiTags('Authorized Devices')
@Controller('authorized-devices')
export class UpdateAuthorizedDevicesController {
  constructor(private readonly service: UpdateAuthorizedDevicesService) {}

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Atualizar dispositivo autorizado!',
    description:
      'Ponto de extremidade responsável por atualizar os dados de um dispositivo autorizado!',
  })
  @ApiResponse({
    status: 200,
    description: 'Dispositivo autorizado atualizado com sucesso!',
  })
  @ApiResponse({
    status: 404,
    description: 'Dispositivo autorizado não encontrado!',
  })
  @ApiBody({ type: UpdateAuthorizedDevicesDto })
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateAuthorizedDevicesDto,
  ) {
    const device = await this.service.update(Number(id), dto);

    return formatResponse({
      message: 'Dispositivo autorizado atualizado com sucesso!',
      statusCode: HttpStatus.OK,
      data: device,
    });
  }
}
