/**
 * IMPORTS
 */
import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// domain / services
import { GetOneCompanyRulesService } from '@src/domain/use-cases/company-rules/get-one-company-rules.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

@ApiTags('Company Rules')
@Controller('company-rules')
export class GetOneCompanyRulesController {
  constructor(private readonly service: GetOneCompanyRulesService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Buscar regras da empresa por ID!',
    description:
      'Ponto de extremidade responsável por buscar as regras de uma empresa pelo ID!',
  })
  @ApiResponse({
    status: 200,
    description: 'Regras encontradas com sucesso!',
  })
  @ApiResponse({
    status: 404,
    description: 'Regras não encontradas!',
  })
  async findOne(@Param('id') id: number) {
    const rules = await this.service.findOne(Number(id));

    return formatResponse({
      message: 'Regras da empresa encontradas com sucesso!',
      statusCode: HttpStatus.OK,
      data: rules,
    });
  }
}
