import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerActivityDto } from './create-customer-activity.dto';

export class UpdateCustomerActivityDto extends PartialType(CreateCustomerActivityDto) {}
