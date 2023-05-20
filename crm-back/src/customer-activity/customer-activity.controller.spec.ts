import { Test, TestingModule } from '@nestjs/testing';
import { CustomerActivityController } from './customer-activity.controller';
import { CustomerActivityService } from './customer-activity.service';

describe('CustomerActivityController', () => {
  let controller: CustomerActivityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerActivityController],
      providers: [CustomerActivityService],
    }).compile();

    controller = module.get<CustomerActivityController>(CustomerActivityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
