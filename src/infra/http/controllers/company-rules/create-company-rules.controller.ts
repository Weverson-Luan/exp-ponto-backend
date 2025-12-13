/**
 * IMPORTS
 */
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// domain / services
import { CreateCompanyRulesService } from '@src/domain/use-cases/company-rules/create-company-rules.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

// dtos
import { CreateCompanyRulesDto } from '@src/core/shared/dtos/company-rules/create-company-rules.dto';

@ApiTags('Company Rules')
@Controller('company-rules')
export class CreateCompanyRulesController {
  constructor(private readonly service: CreateCompanyRulesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Criar regras da empresa!',
    description:
      'Ponto de extremidade responsável por registrar as regras de jornada de uma empresa!',
  })
  @ApiResponse({
    status: 201,
    description: 'Regras criadas com sucesso!',
  })
  @ApiBody({ type: CreateCompanyRulesDto })
  async create(@Body() dto: CreateCompanyRulesDto) {
    const rules = await this.service.create(dto);

    return formatResponse({
      message: 'Regras da empresa criadas com sucesso!',
      statusCode: HttpStatus.CREATED,
      data: rules,
    });
  }
}
