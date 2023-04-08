import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateTableDto {

    @IsInt()
    table_number: number

    @IsInt()
    table_capacity: number

    @IsString()
    @IsOptional()
    table_location: string

    @IsOptional()
    table_status
}
