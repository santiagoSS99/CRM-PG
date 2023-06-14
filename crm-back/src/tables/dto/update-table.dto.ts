import { PartialType } from '@nestjs/mapped-types';
import { CreateTableDto } from './create-table.dto';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTableDto extends PartialType(CreateTableDto) {

    @IsNumber()
    @IsOptional()
    status: any

    @IsNumber()
    @IsOptional()
    table_number: any

    @IsNumber()
    @IsOptional()
    table_capacity: any

    @IsString()
    @IsOptional()
    table_location: any
}
