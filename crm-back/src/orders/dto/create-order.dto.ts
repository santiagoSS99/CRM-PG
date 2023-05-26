import { IsDateString, IsNumber, IsString, MinLength, IsOptional, IsArray } from "class-validator";
import { Product } from "src/products/entities";

export class CreateOrderDto {
    @IsString()
    @MinLength(2)
    order_details

    @IsDateString()
    order_date

    @IsNumber()
    quantity

    @IsNumber()
    order_status: any

    @IsString()
    @IsOptional()
    observations

    @IsString()
    // @IsArray()
    product: any
}
