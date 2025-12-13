/**
 * IMPORTS
 */
import { PartialType } from '@nestjs/swagger';

// dtos
import { CreateUsersSystemSettingsDto } from './create-create-users-system-settings.dto';

export class UpdateUsersSystemSettingsDto extends PartialType(
  CreateUsersSystemSettingsDto,
) {}
