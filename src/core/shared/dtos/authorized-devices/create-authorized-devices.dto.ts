/**
 * IMPORTS
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateAuthorizedDevicesDto {
  @ApiPropertyOptional({ example: 27 })
  @IsOptional()
  @IsInt()
  official_id?: number;

  @ApiProperty({ example: 'ANDROID-DEVICE-UUID-123' })
  @IsString()
  device_id!: string;

  @ApiProperty({ example: 'Samsung Galaxy S23' })
  @IsString()
  name!: string;

  @ApiProperty({ example: '2025-01-15T09:00:00Z' })
  @IsDateString()
  authorized_in!: string;
}
