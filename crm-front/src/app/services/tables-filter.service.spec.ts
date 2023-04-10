import { TestBed } from '@angular/core/testing';

import { TablesFilterService } from './tables-filter.service';

describe('TablesFilterService', () => {
  let service: TablesFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablesFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
