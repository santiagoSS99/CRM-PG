import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';


@Injectable()
export class FilesService {

    constructor() { }
    getStaticProductImage(imageName: string) {
        // const path = join(__dirname, '../../static/products', imageName)
        const path = join(__dirname, '../../static/products', imageName)

        if (!existsSync(path)) {
            throw new BadRequestException(`Not product found with ${imageName} name`)
        }
        return path
    }
}
