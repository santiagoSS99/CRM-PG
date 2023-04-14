import { IsDateString, IsNumber, IsOptional, } from 'class-validator';
import { Product } from '../../products/entities/product.entity';

export class CreatePurchaseDto {
    @IsDateString()
    purchase_date: string;

    @IsNumber()
    quantity: number;

    @IsOptional()
    product: Product;

    @IsNumber()
    @IsOptional()
    customer: number;
}
