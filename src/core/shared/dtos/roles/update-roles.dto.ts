/**
 * IMPORTS
 */
import { PartialType } from '@nestjs/swagger';

// typings
import { CreateRoleDto } from './create-roles.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
