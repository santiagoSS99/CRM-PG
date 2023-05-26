import { TestBed } from '@angular/core/testing';

import { PurchaseLinesService } from './purchase-lines.service';

describe('PurchaseLinesService', () => {
  let service: PurchaseLinesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseLinesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
