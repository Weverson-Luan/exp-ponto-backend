/**
 * IMPORTS
 */
import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// domain / services
import { GetAllCompanyRulesService } from '@src/domain/use-cases/company-rules/get-all-company-rules.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

// dtos
import { PaginationQueryCompanyRulesDto } from '@src/core/shared/dtos/company-rules/pagination-query-company-rules.dto';

@ApiTags('Company Rules')
@Controller('company-rules')
export class GetAllCompanyRulesController {
  constructor(private readonly service: GetAllCompanyRulesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Listar regras das empresas!',
    description:
      'Ponto de extremidade responsável por listar regras de empresas com paginação!',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de regras retornada com sucesso!',
  })
  async list(@Query() query: PaginationQueryCompanyRulesDto) {
    const result = await this.service.findAll(query);

    return formatResponse({
      message: 'Regras listadas com sucesso!',
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
