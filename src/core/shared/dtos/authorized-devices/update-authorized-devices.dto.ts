/**
 * IMPORTS
 */
import { PartialType } from '@nestjs/swagger';

// dtos
import { CreateAuthorizedDevicesDto } from './create-authorized-devices.dto';

export class UpdateAuthorizedDevicesDto extends PartialType(
  CreateAuthorizedDevicesDto,
) {}
