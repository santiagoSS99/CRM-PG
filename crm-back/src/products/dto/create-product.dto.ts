import { IsString, MinLength, IsNumber, IsPositive, IsOptional, IsInt, IsIn } from 'class-validator'

export class CreateProductDto {
    [x: string]: any

    @IsString()
    @MinLength(3)
    product_name: string

    @IsInt()
    // @IsPositive()
    @IsOptional()
    price?: number

    @IsString()
    @IsOptional()
    description?: string

    @IsPositive()
    @IsOptional()
    @IsInt()
    stock?: number

    @IsOptional()
    @IsString()
    imageURL?: string

    @IsString()
    @IsOptional()
    provider?: string

    @IsInt()
    @IsOptional()
    quantity?: number

    @IsInt()
    @IsOptional()
    selled?: number

    @IsOptional()
    @IsString()
    barcode?: string
}
