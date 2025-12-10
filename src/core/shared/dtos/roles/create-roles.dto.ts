/**
 * IMPORTS
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsUUID,
} from 'class-validator';

export enum RolesName {
  admin = 'admin',
  supervisor_ti = 'supervisor_ti',
  supervisor_rh = 'supervisor_rh',
  official = 'official',
}

export class CreateRoleDto {
  @ApiPropertyOptional({
    example: 'a465cf56-bacf-4cf6-9c8d-0d9d845a36a4',
    description:
      'ID do papel (opcional, será gerado automaticamente se omitido)',
  })
  @IsUUID()
  @IsOptional()
  id?: number;

  @ApiProperty({
    example: 'admin',
    description: 'Nome do papel',
  })
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  name!: RolesName;

  @ApiPropertyOptional({
    example: 'Administrador com acesso total ao sistema.',
    description: 'Descrição do papel',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Define se o papel está ativo ou não (padrão: true)',
  })
  @IsBoolean()
  @IsOptional()
  ativo?: boolean;
}
