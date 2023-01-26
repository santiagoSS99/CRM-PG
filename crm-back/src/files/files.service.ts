import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { existsSync } from 'fs';
import { join } from 'path';
import { Observable } from 'rxjs';
import { Product, ProductImage } from 'src/products/entities';
import { Repository } from 'typeorm';


@Injectable()
export class FilesService {

    constructor(
        @InjectRepository(Product)
        private producRepo: Repository<Product>,
        @InjectRepository(ProductImage)
        private imageRepo: Repository<ProductImage>
    ) {

    }

    getStaticProductImage(imageName: string) {
        const path = join(__dirname, '../../static/products', imageName)

        if (existsSync(path)) {
            throw new BadRequestException('Not product found')
        }
        return path
    }

    async updateProductImage(productId, url) {
        const product = await this.producRepo.findOne(productId);
        const image = new ProductImage()
        image.url = url;
        image.product = product
        await this.imageRepo.save(image)
    }


}
