import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseLineController } from './purchase-line.controller';
import { PurchaseLineService } from './purchase-line.service';

describe('PurchaseLineController', () => {
  let controller: PurchaseLineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseLineController],
      providers: [PurchaseLineService],
    }).compile();

    controller = module.get<PurchaseLineController>(PurchaseLineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
