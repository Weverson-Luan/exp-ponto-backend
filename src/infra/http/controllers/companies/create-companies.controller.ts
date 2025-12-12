/**
 * IMPORTS
 */
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// domain / services
import { CreateCompaniesService } from '@src/domain/use-cases/companies/create-companies.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

// dtos
import { CreateCompanyDto } from '@src/core/shared/dtos/companies/create-companies.dto';

@ApiTags('Companies')
@Controller('companies')
export class CreateCompaniesController {
  constructor(private companiesService: CreateCompaniesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Criar uma nova empresa!',
    description:
      'Ponto de extremidade responsável por registrar uma nova empresa no sistema!',
  })
  @ApiResponse({
    status: 201,
    description: 'Empresa criada com sucesso!',
    type: CreateCompanyDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação nos dados enviados!',
  })
  @ApiBody({ type: CreateCompanyDto })
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    const company = await this.companiesService.create(createCompanyDto);

    return formatResponse({
      message: 'Empresa criada com sucesso!',
      statusCode: HttpStatus.CREATED,
      data: company,
    });
  }
}
