/**
 * IMPORTS
 */
import { PartialType } from '@nestjs/swagger';

// dtos
import { CreateCompanyDto } from './create-companies.dto';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}
