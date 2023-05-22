import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchaseLineDto } from './create-purchase-line.dto';

export class UpdatePurchaseLineDto extends PartialType(CreatePurchaseLineDto) {}
