import { Test, TestingModule } from '@nestjs/testing';
import { CustomerMailController } from './customer-mail.controller';
import { CustomerMailService } from './customer-mail.service';

describe('CustomerMailController', () => {
  let controller: CustomerMailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerMailController],
      providers: [CustomerMailService],
    }).compile();

    controller = module.get<CustomerMailController>(CustomerMailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
