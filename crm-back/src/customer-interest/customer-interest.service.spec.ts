import { Test, TestingModule } from '@nestjs/testing';
import { CustomerInterestService } from './customer-interest.service';

describe('CustomerInterestService', () => {
  let service: CustomerInterestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerInterestService],
    }).compile();

    service = module.get<CustomerInterestService>(CustomerInterestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
