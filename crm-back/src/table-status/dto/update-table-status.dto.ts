import { PartialType } from '@nestjs/mapped-types';
import { CreateTableStatusDto } from './create-table-status.dto';

export class UpdateTableStatusDto extends PartialType(CreateTableStatusDto) {}
