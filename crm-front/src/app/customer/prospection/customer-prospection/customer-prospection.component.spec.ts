import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProspectionComponent } from './customer-prospection.component';

describe('CustomerProspectionComponent', () => {
  let component: CustomerProspectionComponent;
  let fixture: ComponentFixture<CustomerProspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerProspectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerProspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
