/**
 * IMPORTS
 */

import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UsersResponseSwagguerDto {
  @ApiProperty({ example: 'Luan de Sousa' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional({ example: 'luansousa@email.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: 'senha123' })
  @IsString()
  @IsOptional()
  password?: string;

  // @ApiPropertyOptional({ example: "+55 31 99999-8888" })
  // @IsString()
  // @IsOptional()
  // phone?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  ativo?: boolean;

  @ApiPropertyOptional({ example: 1 })
  @IsString()
  @IsOptional()
  role_id?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsString()
  @IsOptional()
  company_id?: string;
}
