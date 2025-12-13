/**
 * IMPORTS
 */
import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// domain / services
import { GetAllAuthorizedDevicesService } from '@src/domain/use-cases/authorized-devices/get-all-authorized-devices.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

// dtos
import { PaginationQueryAuthorizedDevicesDto } from '@src/core/shared/dtos/authorized-devices/pagination-query-authorized-devices.dto';

@ApiTags('Authorized Devices')
@Controller('authorized-devices')
export class GetAllAuthorizedDevicesController {
  constructor(private readonly service: GetAllAuthorizedDevicesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Listar dispositivos autorizados!',
    description:
      'Ponto de extremidade responsável por listar dispositivos autorizados com paginação!',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de dispositivos autorizados retornada com sucesso!',
  })
  async list(@Query() query: PaginationQueryAuthorizedDevicesDto) {
    const result = await this.service.findAll(query);

    return formatResponse({
      message: 'Dispositivos autorizados listados com sucesso!',
      statusCode: HttpStatus.OK,
      data: {
        total: result.total,
        totalPages: result.totalPages,
        page: result.page,
        limit: result.limit,
        items: result.data,
      },
    });
  }
}
