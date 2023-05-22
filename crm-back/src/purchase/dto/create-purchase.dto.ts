import { IsDateString, IsNumber, IsOptional, } from 'class-validator';
import { Product } from '../../products/entities/product.entity';
import { Customer } from 'src/customer/entities/customer.entity';

export class CreatePurchaseDto {
    @IsDateString()
    purchase_date: any;

    @IsNumber()
    @IsOptional()
    customer: Customer;
}
