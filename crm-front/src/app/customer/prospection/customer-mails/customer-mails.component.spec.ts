import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMailsComponent } from './customer-mails.component';

describe('CustomerMailsComponent', () => {
  let component: CustomerMailsComponent;
  let fixture: ComponentFixture<CustomerMailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerMailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerMailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
