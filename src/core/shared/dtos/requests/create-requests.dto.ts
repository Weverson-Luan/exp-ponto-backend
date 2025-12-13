/**
 * IMPORTS
 */
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum RequestTypeEnum {
  ABONO = 'ABONO',
  AJUSTE = 'AJUSTE',
  AVULSA = 'AVULSA',
}

export enum RequestStatusEnum {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export class CreateRequestsDto {
  @ApiProperty({ example: 27 })
  @IsInt()
  @Min(1)
  user_id!: number;

  @ApiProperty({ example: 13 })
  @IsInt()
  @Min(1)
  company_id!: number;

  @ApiProperty({ enum: RequestTypeEnum })
  @IsEnum(RequestTypeEnum)
  type!: RequestTypeEnum;

  @ApiProperty({
    example: 'Solicitação de ajuste de ponto por esquecimento',
  })
  @IsString()
  @IsNotEmpty()
  reason!: string;

  @ApiPropertyOptional({ enum: RequestStatusEnum })
  @IsOptional()
  @IsEnum(RequestStatusEnum)
  status?: RequestStatusEnum = RequestStatusEnum.PENDING;

  @ApiProperty({
    example: '2025-01-15T10:30:00',
  })
  @IsDateString()
  requestDate!: string;

  @ApiPropertyOptional({
    example: 'https://cdn.app.com/anexos/comprovante.pdf',
  })
  @IsOptional()
  @IsString()
  attachmentUrl?: string;
}
