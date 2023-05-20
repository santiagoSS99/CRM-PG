import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerMailDto } from './create-customer-mail.dto';

export class UpdateCustomerMailDto extends PartialType(CreateCustomerMailDto) {}
