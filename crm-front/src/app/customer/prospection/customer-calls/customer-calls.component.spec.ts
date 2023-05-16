import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCallsComponent } from './customer-calls.component';

describe('CustomerCallsComponent', () => {
  let component: CustomerCallsComponent;
  let fixture: ComponentFixture<CustomerCallsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerCallsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
