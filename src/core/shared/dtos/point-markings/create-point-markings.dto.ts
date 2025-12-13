/**
 * IMPORTS
 */
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsDateString,
  Min,
  IsNumber,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum PointMarkingsTypeEnum {
  input = 'input',
  output_interval = 'output_interval',
  return_interval = 'return_interval',
  output = 'output',
}

export enum PointMarkingsSourceEnum {
  mobile = 'mobile',
  web = 'web',
  qr = 'qr',
  admin = 'admin',
}

export class CreatePointMarkingsDto {
  @ApiProperty({ example: 1, description: 'ID do usuário' })
  @IsInt()
  @Min(1)
  official_id!: number;

  @ApiProperty({ enum: PointMarkingsTypeEnum })
  @IsEnum(PointMarkingsTypeEnum)
  type!: PointMarkingsTypeEnum;

  @ApiProperty({
    example: '2025-01-10T08:00:00',
    description: 'Data e hora da marcação',
  })
  @IsDateString()
  marked_at!: string;

  @ApiPropertyOptional({ example: -19.9245 })
  @IsOptional()
  @IsNumber()
  lat?: number;

  @ApiPropertyOptional({ example: -43.9352 })
  @IsOptional()
  @IsNumber()
  lgn?: number;

  @ApiPropertyOptional({ enum: PointMarkingsSourceEnum })
  @IsOptional()
  @IsEnum(PointMarkingsSourceEnum)
  origin?: PointMarkingsSourceEnum;
}
