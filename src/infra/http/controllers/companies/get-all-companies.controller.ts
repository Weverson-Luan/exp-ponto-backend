/**
 * IMPORTS
 */
import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// domain / services
import { GetAllCompaniesService } from '@src/domain/use-cases/companies/get-all-companies.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

// dtos
import { PaginationQueryCompaniesDto } from '@src/core/shared/dtos/companies/pagination-query-companies.dto';

@ApiTags('Companies')
@Controller('companies')
export class GetAllCompaniesController {
  constructor(private companiesService: GetAllCompaniesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Listar empresas!',
    description:
      'Ponto de extremidade responsável por listar empresas com paginação!',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de empresas retornada com sucesso!',
  })
  async list(@Query() query: PaginationQueryCompaniesDto) {
    const result = await this.companiesService.findAll(query);

    return formatResponse({
      message: 'Empresas listadas com sucesso!',
      statusCode: HttpStatus.OK,
      data: result.data,
    });
  }
}
