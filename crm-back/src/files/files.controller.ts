import { FilesService } from './files.service';
import { Controller, Get, Post, Param, BadRequestException, Res } from '@nestjs/common';
import { UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

import { fileFilter } from './helpers/fileFilter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/fileNamer.helper';
import { ConfigService } from '@nestjs/config';
import { Product } from 'src/products/entities';


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
    console.log(path)
    res.sendFile(path);
  }

  @Post('product')
  // fileinterceptor me indica que espera el key como el nombre que le ponga, en este caso images
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
    if (!file) {
      console.log("🚀 ~ file: files.controller.ts:45 ~ FilesController ~ file", file)
      throw new BadRequestException('Make sure that the file is an image')
    } else {
      console.log("returning file", file)
    }
    const secureUrl = `${this.configService.get('HOST_API')}/files/product/${file.filename}`;
    const filename = file.filename

    return { secureUrl, filename };
  }
}