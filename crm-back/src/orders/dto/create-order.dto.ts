import { IsNumber, IsString, MinLength } from "class-validator";

export class CreateOrderDto {
    @IsString()
    @MinLength(2)
    order_details

}
