import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInterestsComponent } from './customer-interests.component';

describe('CustomerInterestsComponent', () => {
  let component: CustomerInterestsComponent;
  let fixture: ComponentFixture<CustomerInterestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerInterestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerInterestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
