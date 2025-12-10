/**
 * IMPORTS
 */
import { PartialType } from '@nestjs/swagger';

// dtos
import { CreateUserDto } from './create-users.dtos';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
