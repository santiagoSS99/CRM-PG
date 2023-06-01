import { IsDateString, IsNumber, IsString, MinLength, IsOptional, IsArray, ValidateIf } from "class-validator";
import { Product } from "src/products/entities";

export class CreateOrderDto {
    @IsString()
    @MinLength(2)
    order_details

    @IsNumber()
    tableId

    @IsNumber()
    amount

    @IsDateString()
    order_date

    @IsNumber()
    quantity

    @IsNumber()
    order_status: any

    @IsOptional()
    @IsString()
    observations!: string;

    @IsString()
    // @IsArray()
    product: any
}
