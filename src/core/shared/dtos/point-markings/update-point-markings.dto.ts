/**
 * IMPORTS
 */
import { PartialType } from '@nestjs/swagger';

// dtos
import { CreatePointMarkingsDto } from './create-point-markings.dto';

export class UpdatePointMarkingsDto extends PartialType(
  CreatePointMarkingsDto,
) {}
