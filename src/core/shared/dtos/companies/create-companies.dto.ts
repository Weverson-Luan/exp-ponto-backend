/**
 * IMPORTS
 */
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Length,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({ example: 'Expresso Figueiredo LTDA' })
  @IsString()
  @IsNotEmpty()
  company_name!: string;

  @ApiPropertyOptional({ example: 'Expresso Figueiredo' })
  @IsOptional()
  @IsString()
  company_name_fatasia?: string;

  @ApiProperty({ example: '12345678000199' })
  @IsString()
  @Length(11, 14, {
    message: 'Documento deve conter entre 11 e 14 dígitos (CPF/CNPJ)',
  })
  @IsNotEmpty()
  document!: string;

  @ApiPropertyOptional({ example: -19.9245 })
  @IsOptional()
  @IsNumber()
  lat?: number;

  @ApiPropertyOptional({ example: -43.9352 })
  @IsOptional()
  @IsNumber()
  lgn?: number;
}
