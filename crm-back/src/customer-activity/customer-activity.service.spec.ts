import { Test, TestingModule } from '@nestjs/testing';
import { CustomerActivityService } from './customer-activity.service';

describe('CustomerActivityService', () => {
  let service: CustomerActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerActivityService],
    }).compile();

    service = module.get<CustomerActivityService>(CustomerActivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
