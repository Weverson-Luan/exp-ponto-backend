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
import { DeleteCompaniesService } from '@src/domain/use-cases/companies/delete-companies.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

@ApiTags('Companies')
@Controller('companies')
export class DeleteCompaniesController {
  constructor(private companiesService: DeleteCompaniesService) {}

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Remover empresa!',
    description:
      'Ponto de extremidade responsável por remover uma empresa do sistema!',
  })
  @ApiResponse({
    status: 200,
    description: 'Empresa removida com sucesso!',
  })
  @ApiResponse({
    status: 404,
    description: 'Empresa não encontrada!',
  })
  async delete(@Param('id') id: number) {
    const result = await this.companiesService.execute(id);

    return formatResponse({
      message: 'Empresa removida com sucesso!',
      statusCode: HttpStatus.OK,
      data: result,
    });
  }
}
