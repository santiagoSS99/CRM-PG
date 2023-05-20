import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerCallDto } from './create-customer-call.dto';

export class UpdateCustomerCallDto extends PartialType(CreateCustomerCallDto) {}
