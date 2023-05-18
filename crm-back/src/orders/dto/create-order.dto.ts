import { IsDateString, IsNumber, IsString, MinLength, IsOptional } from "class-validator";

export class CreateOrderDto {
    @IsString()
    @MinLength(2)
    order_details

    @IsDateString()
    order_date

    @IsNumber()
    quantity

    @IsString()
    @IsOptional()
    observations
}
