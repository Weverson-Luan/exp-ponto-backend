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
import { UpdateCompaniesService } from '@src/domain/use-cases/companies/update-companies.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

// dtos
import { UpdateCompanyDto } from '@src/core/shared/dtos/companies/update-companies.dto';

@ApiTags('Companies')
@Controller('companies')
export class UpdateCompaniesController {
  constructor(private companiesService: UpdateCompaniesService) {}

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Atualizar empresa!',
    description:
      'Ponto de extremidade responsável por atualizar os dados de uma empresa!',
  })
  @ApiResponse({
    status: 200,
    description: 'Empresa atualizada com sucesso!',
  })
  @ApiResponse({
    status: 404,
    description: 'Empresa não encontrada!',
  })
  @ApiBody({ type: UpdateCompanyDto })
  async update(
    @Param('id') id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    const company = await this.companiesService.update(
      Number(id),
      updateCompanyDto,
    );

    return formatResponse({
      message: 'Empresa atualizada com sucesso!',
      statusCode: HttpStatus.OK,
      data: company,
    });
  }
}
