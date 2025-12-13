/**
 * IMPORTS
 */
import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// domain / services
import { GetOneAuthorizedDevicesService } from '@src/domain/use-cases/authorized-devices/get-one-authorized-devices.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

@ApiTags('Authorized Devices')
@Controller('authorized-devices')
export class GetOneAuthorizedDevicesController {
  constructor(private readonly service: GetOneAuthorizedDevicesService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Buscar dispositivo autorizado por ID!',
    description:
      'Ponto de extremidade responsável por buscar um dispositivo autorizado pelo ID!',
  })
  @ApiResponse({
    status: 200,
    description: 'Dispositivo autorizado encontrado com sucesso!',
  })
  @ApiResponse({
    status: 404,
    description: 'Dispositivo autorizado não encontrado!',
  })
  async findOne(@Param('id') id: number) {
    const device = await this.service.findOne(Number(id));

    return formatResponse({
      message: 'Dispositivo autorizado encontrado com sucesso!',
      statusCode: HttpStatus.OK,
      data: device,
    });
  }
}
