/**
 * IMPORTS
 */
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// domain / services
import { CreateAuthorizedDevicesService } from '@src/domain/use-cases/authorized-devices/create-authorized-devices.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

// dtos
import { CreateAuthorizedDevicesDto } from '@src/core/shared/dtos/authorized-devices/create-authorized-devices.dto';

@ApiTags('Authorized Devices')
@Controller('authorized-devices')
export class CreateAuthorizedDevicesController {
  constructor(private readonly service: CreateAuthorizedDevicesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Autorizar dispositivo!',
    description:
      'Ponto de extremidade responsável por autorizar um dispositivo para uso no sistema.',
  })
  @ApiResponse({
    status: 201,
    description: 'Dispositivo autorizado com sucesso!',
  })
  @ApiBody({ type: CreateAuthorizedDevicesDto })
  async create(@Body() data: CreateAuthorizedDevicesDto) {
    const device = await this.service.create(data);

    return formatResponse({
      message: 'Dispositivo autorizado com sucesso!',
      statusCode: HttpStatus.CREATED,
      data: device,
    });
  }
}
