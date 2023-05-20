import { Module } from '@nestjs/common';
import { CustomerActivityService } from './customer-activity.service';
import { CustomerActivityController } from './customer-activity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerActivity } from './entities/customer-activity.entity';

@Module({
  controllers: [CustomerActivityController],
  providers: [CustomerActivityService],
  imports: [TypeOrmModule.forFeature([CustomerActivity])]
})
export class CustomerActivityModule { }
