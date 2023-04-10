import { Test, TestingModule } from '@nestjs/testing';
import { TableStatusService } from './table-status.service';

describe('TableStatusService', () => {
  let service: TableStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TableStatusService],
    }).compile();

    service = module.get<TableStatusService>(TableStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
