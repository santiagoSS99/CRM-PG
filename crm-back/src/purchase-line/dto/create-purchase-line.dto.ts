import { IsArray, IsDateString, IsNumber, IsOptional, IsString } from "class-validator";
import { Product } from "src/products/entities";
import { Purchase } from "src/purchase/entities/purchase.entity";

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

    @IsArray()
    products: Product[];

}
