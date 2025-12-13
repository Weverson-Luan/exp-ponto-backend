/**
 * IMPORTS
 */
import { PartialType } from '@nestjs/swagger';

// dtos
import { CreateJourneyDto } from './create-journeys.dto';

export class UpdateJourneysDto extends PartialType(CreateJourneyDto) {}
