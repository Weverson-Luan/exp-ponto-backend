/**
 * IMPORTS
 */
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  Length,
  IsInt,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  ativo?: boolean;

  @ApiProperty({ example: 'Luan de Sousa' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'email@empresa.com' })
  @IsEmail()
  email!: string;

  @ApiPropertyOptional({ example: 'senha123' })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional({ example: '31998887777' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: '12345678900' })
  @IsString()
  @Length(11, 14, {
    message: 'Documento deve conter entre 11 e 14 dígitos (CPF/CNPJ)',
  })
  @IsNotEmpty()
  document!: string;

  @ApiPropertyOptional({ example: 'MG1234567' })
  @IsOptional()
  @IsString()
  rg?: string;

  @ApiPropertyOptional({ example: 'Brasileiro' })
  @IsOptional()
  @IsString()
  naturalness?: string;

  @ApiPropertyOptional({ example: 'José de Sousa' })
  @IsOptional()
  @IsString()
  father_name?: string;

  @ApiPropertyOptional({ example: 'Maria de Sousa' })
  @IsOptional()
  @IsString()
  mother_name?: string;

  @ApiPropertyOptional({ example: '3667' })
  @IsOptional()
  @IsString()
  matriculation?: string;

  @ApiPropertyOptional({ example: '2025-12-10 08:01:01' })
  @IsOptional()
  @IsDateString()
  birth_date?: string;

  @ApiPropertyOptional({ example: '2025-01-03 08:01:01' })
  @IsOptional()
  @IsDateString()
  admission_date?: string;

  @ApiPropertyOptional({ example: '2025-04-22 18:00:00' })
  @IsOptional()
  @IsDateString()
  dismissal_date?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  role_id?: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  company_id!: number;
}
