import { Test, TestingModule } from '@nestjs/testing';
import { TableStatusController } from './table-status.controller';
import { TableStatusService } from './table-status.service';

describe('TableStatusController', () => {
  let controller: TableStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TableStatusController],
      providers: [TableStatusService],
    }).compile();

    controller = module.get<TableStatusController>(TableStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
