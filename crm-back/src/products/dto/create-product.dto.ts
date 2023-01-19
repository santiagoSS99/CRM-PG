import { IsString, MinLength, IsPositive, IsOptional, IsInt, IsArray } from 'class-validator'

export class CreateProductDto {
    // [x: string]: any

    @IsString()
    @MinLength(3)
    product_name: string

    @IsInt()
    @IsOptional()
    price?: number

    @IsString()
    @IsOptional()
    description?: string

    @IsPositive()
    @IsOptional()
    @IsInt()
    stock?: number

    @IsString()
    slug: string

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

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    tags: string[]

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[];
}
