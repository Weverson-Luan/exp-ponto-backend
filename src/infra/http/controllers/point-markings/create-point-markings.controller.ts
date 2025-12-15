/**
 * IMPORTS
 */
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

// domain / services
import { CreatePointMarkingsService } from '@src/domain/use-cases/point-markings/create-point-markings.service';

// shared / utils
import { formatResponse } from '@src/core/shared/utils/format-response';

// dtos
import { CreatePointMarkingsDto } from '@src/core/shared/dtos/point-markings/create-point-markings.dto';
import { multerPointMarkingsConfig } from '@src/infra/upload/multer.config';

@ApiTags('Point Markings')
@Controller('point-markings')
export class CreatePointMarkingsController {
  constructor(private readonly service: CreatePointMarkingsService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('photo', multerPointMarkingsConfig))
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Registrar marcação de ponto',
    description: 'Registra uma marcação de ponto com foto obrigatória',
  })
  @ApiResponse({
    status: 201,
    description: 'Marcação registrada com sucesso',
  })
  @ApiBody({ type: CreatePointMarkingsDto })
  async create(
    @Body() data: CreatePointMarkingsDto,
    @UploadedFile() file: any,
  ) {
    if (!file) {
      throw new BadRequestException(
        'Foto é obrigatória para registrar o ponto',
      );
    }

    const pointMarkings = await this.service.create(data, file);

    return formatResponse({
      message: 'Marcação de ponto registrada com sucesso!',
      statusCode: HttpStatus.CREATED,
      data: pointMarkings,
    });
  }
}
