/**
 * IMPORTS
 */
import {
  IsArray,
  ValidateNested,
  IsDateString,
  IsEnum,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { MarkingOrigin, MarkingType } from 'generated/prisma/enums';

class SyncPointMarkingDto {
  @IsDateString()
  marked_at: string;

  @IsEnum(MarkingType)
  type: MarkingType;

  @IsEnum(MarkingOrigin)
  origin: MarkingOrigin;

  @IsOptional()
  @IsNumber()
  lat?: number;

  @IsOptional()
  @IsNumber()
  lgn?: number;
}

export class SyncPointMarkingsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SyncPointMarkingDto)
  markings: SyncPointMarkingDto[];
}
