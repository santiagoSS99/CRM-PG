import { IsString } from "class-validator";
import { User } from "src/auth/entities/user.entity";
import { Customer } from "src/customer/entities/customer.entity";

export class CreateCustomerMailDto {
    @IsString()
    subject: string

    @IsString()
    content: string

    @IsString()
    assesor: User

    @IsString()
    customer: Customer
}
