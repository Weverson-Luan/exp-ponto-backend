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
import { UpdateCompanyRulesService } from '@src/domain/use-cases/company-rules/update-company-rules.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

// dtos
import { UpdateCompanyRulesDto } from '@src/core/shared/dtos/company-rules/update-company-rules.dto';

@ApiTags('Company Rules')
@Controller('company-rules')
export class UpdateCompanyRulesController {
  constructor(private readonly service: UpdateCompanyRulesService) {}

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Atualizar regras da empresa!',
    description:
      'Ponto de extremidade responsável por atualizar as regras de jornada de uma empresa!',
  })
  @ApiResponse({
    status: 200,
    description: 'Regras atualizadas com sucesso!',
  })
  @ApiResponse({
    status: 404,
    description: 'Regras não encontradas!',
  })
  @ApiBody({ type: UpdateCompanyRulesDto })
  async update(@Param('id') id: number, @Body() dto: UpdateCompanyRulesDto) {
    const rules = await this.service.update(Number(id), dto);

    return formatResponse({
      message: 'Regras da empresa atualizadas com sucesso!',
      statusCode: HttpStatus.OK,
      data: rules,
    });
  }
}
