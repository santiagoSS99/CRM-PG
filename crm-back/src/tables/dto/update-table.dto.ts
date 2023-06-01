import { PartialType } from '@nestjs/mapped-types';
import { CreateTableDto } from './create-table.dto';
import { IsInt, IsNumber } from 'class-validator';

export class UpdateTableDto extends PartialType(CreateTableDto) {

    @IsNumber()
    status: any

}
