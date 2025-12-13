/**
 * IMPORTS
 */
import { IsDateString, IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum JourneyStatusEnum {
  normal = 'normal',
  incompleto = 'incomplete',
  absences = 'absences',
  day_off = 'day_off',
}

export class CreateJourneyDto {
  @ApiProperty({ example: 27, description: 'ID do usuário' })
  @IsInt()
  @Min(1)
  official_id!: number;

  @ApiPropertyOptional({
    example: '2025-01-15T08:00:00',
    description: 'Horário de entrada',
  })
  @IsOptional()
  @IsDateString()
  entry_time?: string;

  @ApiPropertyOptional({
    example: '2025-01-15T17:00:00',
    description: 'Horário de saída',
  })
  @IsOptional()
  @IsDateString()
  departure_time?: string;

  @ApiPropertyOptional({
    example: 28800,
    description: 'Total de horas da jornada em segundos',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  total_hours?: number;

  @ApiPropertyOptional({
    example: 0,
    description: 'Total de faltas do dia',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  absences?: number;

  @ApiPropertyOptional({
    example: 3600,
    description: 'Horas extras em segundos',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  extras?: number;

  @ApiProperty({
    example: '2025-01-15',
    description: 'Data da jornada (1 por usuário por dia)',
  })
  @IsDateString()
  journey_date!: string;

  @ApiProperty({ enum: JourneyStatusEnum })
  @IsEnum(JourneyStatusEnum)
  status!: JourneyStatusEnum;
}
