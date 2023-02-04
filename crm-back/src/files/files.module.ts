import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ConfigService } from '@nestjs/config';
import { Product, ProductImage } from 'src/products/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [FilesController],
  providers: [FilesService, ConfigService],
  imports: [TypeOrmModule.forFeature([Product, ProductImage])],
  exports: [FilesService,]
})
export class FilesModule { }
