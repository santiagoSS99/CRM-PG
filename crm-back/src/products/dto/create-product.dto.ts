import { IsString, MinLength, IsNumber, IsPositive, IsOptional, IsInt } from 'class-validator'

export class CreateProductDto {
    [x: string]: any

    @IsString()
    @MinLength(3)
    product_name: string

    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number

    @IsString()
    @IsPositive()
    description?: string

    @IsPositive()
    @IsInt()
    stock?: number

    @IsString()
    imageURL: string

    @IsString()
    provider: string

    @IsString()
    barcode?: string
}
