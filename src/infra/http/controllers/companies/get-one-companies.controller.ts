/**
 * IMPORTS
 */
import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// domain / services
import { GetOneCompaniesService } from '@src/domain/use-cases/companies/get-one-companies.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

@ApiTags('Companies')
@Controller('companies')
export class GetOneCompaniesController {
  constructor(private companiesService: GetOneCompaniesService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Buscar empresa por ID',
    description:
      'Ponto de extremidade responsável por buscar uma empresa pelo ID!',
  })
  @ApiResponse({
    status: 200,
    description: 'Empresa encontrada com sucesso!',
  })
  @ApiResponse({
    status: 404,
    description: 'Empresa não encontrada!',
  })
  async findOne(@Param('id') id: number) {
    const company = await this.companiesService.findOne(id);

    return formatResponse({
      message: 'Empresa encontrada com sucesso!',
      statusCode: HttpStatus.OK,
      data: company,
    });
  }
}
