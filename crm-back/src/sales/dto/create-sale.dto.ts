import { IsNumber, IsObject, IsString } from 'class-validator';

export class CreateSaleDto {
    @IsString()
    table: any;

    @IsString()
    tableStatus: any;

    @IsString()
    purchase: any;
}