/**
 * IMPORTS
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUsersSystemSettingsDto {
  @ApiPropertyOptional({ example: 27 })
  @IsOptional()
  @IsInt()
  user_id?: number;

  @ApiPropertyOptional({ example: 13 })
  @IsOptional()
  @IsInt()
  company_id?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  biometric_enabled?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  recongnation_enabled?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  push_enabled?: boolean;

  @ApiPropertyOptional({ example: 'America/Sao_Paulo' })
  @IsOptional()
  @IsString()
  time_zone?: string;

  @ApiProperty({ example: '2025-01-15T10:00:00Z' })
  @IsDateString()
  last_sync_at!: string;
}
