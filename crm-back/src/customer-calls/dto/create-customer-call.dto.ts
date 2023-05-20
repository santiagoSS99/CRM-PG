import { IsString } from "class-validator";
import { User } from "src/auth/entities/user.entity";
import { Customer } from "src/customer/entities/customer.entity";

export class CreateCustomerCallDto {

    @IsString()
    date: string

    @IsString()
    hour: string

    @IsString()
    result: string

    @IsString()
    note: string

    @IsString()
    assesor: User

    @IsString()
    customer: Customer

}
