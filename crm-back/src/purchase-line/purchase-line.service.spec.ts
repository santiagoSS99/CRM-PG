import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseLineService } from './purchase-line.service';

describe('PurchaseLineService', () => {
  let service: PurchaseLineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchaseLineService],
    }).compile();

    service = module.get<PurchaseLineService>(PurchaseLineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
