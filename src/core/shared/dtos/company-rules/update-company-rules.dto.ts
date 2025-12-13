/**
 * IMPORTS
 */
import { PartialType } from '@nestjs/swagger';

// dtos
import { CreateCompanyRulesDto } from './create-company-rules.dto';

export class UpdateCompanyRulesDto extends PartialType(CreateCompanyRulesDto) {}
