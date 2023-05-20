import { Test, TestingModule } from '@nestjs/testing';
import { CustomerCallsService } from './customer-calls.service';

describe('CustomerCallsService', () => {
  let service: CustomerCallsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerCallsService],
    }).compile();

    service = module.get<CustomerCallsService>(CustomerCallsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
