import { Test, TestingModule } from '@nestjs/testing';
import { CustomerInterestController } from './customer-interest.controller';
import { CustomerInterestService } from './customer-interest.service';

describe('CustomerInterestController', () => {
  let controller: CustomerInterestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerInterestController],
      providers: [CustomerInterestService],
    }).compile();

    controller = module.get<CustomerInterestController>(CustomerInterestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
