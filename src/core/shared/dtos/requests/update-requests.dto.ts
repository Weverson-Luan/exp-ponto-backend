/**
 * IMPORTS
 */
import { PartialType } from '@nestjs/swagger';

// dtos
import { CreateRequestsDto } from './create-requests.dto';

export class UpdateRequestsDto extends PartialType(CreateRequestsDto) {}
