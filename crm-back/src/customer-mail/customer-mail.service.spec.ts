import { Test, TestingModule } from '@nestjs/testing';
import { CustomerMailService } from './customer-mail.service';

describe('CustomerMailService', () => {
  let service: CustomerMailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerMailService],
    }).compile();

    service = module.get<CustomerMailService>(CustomerMailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
