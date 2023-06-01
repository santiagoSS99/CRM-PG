import { IsArray, IsDateString, IsNumber, IsOptional, IsString } from "class-validator";
import { Product } from "src/products/entities";
import { Purchase } from "src/purchase/entities/purchase.entity";

export class CreatePurchaseLineDto {
    @IsNumber()
    quantity: number;

    @IsNumber()
    total: number;

    @IsNumber()
    @IsOptional()
    customer: number;

    @IsNumber()
    purchaseId: number;

    @IsString()
    productId: string;

}
