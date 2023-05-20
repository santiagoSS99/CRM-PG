import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerInterestDto } from './create-customer-interest.dto';

export class UpdateCustomerInterestDto extends PartialType(CreateCustomerInterestDto) {}
