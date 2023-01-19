import { FilesService } from './files.service';
import { Controller, Get, Post, Param, BadRequestException, Res } from '@nestjs/common';
import { UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

import { fileFilter } from './helpers/fileFilter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/fileNamer.helper';
import { ConfigService } from '@nestjs/config';


@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) { }

  @Get('product/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string
  ) {

    const path = this.filesService.getStaticProductImage(imageName);
    // res
    res.sendFile(path);
  }

  @Post('product')
  @UseInterceptors(FileInterceptor('images', {
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: './static/products',
      filename: fileNamer
    })
  }))
  uploadImageFile(
    @UploadedFile()
    file: Express.Multer.File) {
    if (!file) throw new BadRequestException('File')
    const secureUrl = `${this.configService.get("HOST_API")}/files/product/${file.filename}`
    return { secureUrl };
  }
}