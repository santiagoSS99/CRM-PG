import { Test, TestingModule } from '@nestjs/testing';
import { CustomerCallsController } from './customer-calls.controller';
import { CustomerCallsService } from './customer-calls.service';

describe('CustomerCallsController', () => {
  let controller: CustomerCallsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerCallsController],
      providers: [CustomerCallsService],
    }).compile();

    controller = module.get<CustomerCallsController>(CustomerCallsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
