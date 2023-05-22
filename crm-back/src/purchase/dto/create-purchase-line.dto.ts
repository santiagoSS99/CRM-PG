import { IsDateString, IsNumber, IsOptional, } from 'class-validator';
import { Product } from '../../products/entities/product.entity';
import { Purchase } from '../entities/purchase.entity';

export class CreatePurchaseLineDto {
    @IsDateString()
    purchase_date: string;

    @IsNumber()
    quantity: number;

    @IsNumber()
    @IsOptional()
    customer: number;

    @IsNumber()
    purchase: Purchase

    @IsOptional()
    product: Product;

}
