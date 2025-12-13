/**
 * IMPORTS
 */
import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// domain / services
import { DeleteCompanyRulesService } from '@src/domain/use-cases/company-rules/delete-company-rules.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

@ApiTags('Company Rules')
@Controller('company-rules')
export class DeleteCompanyRulesController {
  constructor(private readonly service: DeleteCompanyRulesService) {}

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Remover regras da empresa!',
    description:
      'Ponto de extremidade responsável por remover as regras de jornada de uma empresa!',
  })
  @ApiResponse({
    status: 200,
    description: 'Regras removidas com sucesso!',
  })
  @ApiResponse({
    status: 404,
    description: 'Regras não encontradas!',
  })
  async delete(@Param('id') id: number) {
    const result = await this.service.execute(Number(id));

    return formatResponse({
      message: 'Regras da empresa removidas com sucesso!',
      statusCode: HttpStatus.OK,
      data: result,
    });
  }
}
