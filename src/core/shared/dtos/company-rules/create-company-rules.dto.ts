/**
 * IMPORTS
 */
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum RoundingMethodEnum {
  NONE = 'none',
  MIN_5 = '5min',
  MIN_10 = '10min',
}

export class CreateCompanyRulesDto {
  @ApiProperty({ example: 1, description: 'ID da empresa' })
  @IsInt()
  @Min(1)
  company_id!: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiProperty({
    example: 28800,
    description: 'Carga horária diária em segundos (ex: 8h = 28800)',
  })
  @IsInt()
  @Min(1)
  daily_workload!: number;

  @ApiProperty({
    example: 600,
    description: 'Tolerância de atraso em segundos (ex: 10min = 600)',
  })
  @IsInt()
  @Min(0)
  late_tolerance!: number;

  @ApiProperty({
    example: '2024-01-01T08:00:00',
    description: 'Horário padrão de início',
  })
  @IsDateString()
  start_time!: string;

  @ApiProperty({
    example: '2024-01-01T17:00:00',
    description: 'Horário padrão de fim',
  })
  @IsDateString()
  end_time!: string;

  @ApiProperty({
    example: 3600,
    description: 'Intervalo mínimo em segundos (ex: 1h = 3600)',
  })
  @IsInt()
  @Min(0)
  minimum_interval!: number;

  @ApiPropertyOptional({
    example: 7200,
    description: 'Máximo de horas extras por dia em segundos (ex: 2h = 7200)',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  max_extra_per_day?: number;

  @ApiPropertyOptional({
    enum: RoundingMethodEnum,
    example: RoundingMethodEnum.NONE,
  })
  @IsOptional()
  @IsEnum(RoundingMethodEnum)
  rounding_method?: RoundingMethodEnum;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  break_required?: boolean;

  @ApiProperty({
    example: '2024-01-01T00:00:00',
    description: 'Data a partir da qual a regra passa a valer',
  })
  @IsDateString()
  valid_from!: string;

  @ApiPropertyOptional({
    example: '2024-12-31T23:59:59',
    description: 'Data final de validade (null = vigente)',
  })
  @IsOptional()
  @IsDateString()
  valid_to?: string;
}
