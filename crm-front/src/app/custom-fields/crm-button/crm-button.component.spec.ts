import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmButtonComponent } from './crm-button.component';

describe('CrmButtonComponent', () => {
  let component: CrmButtonComponent;
  let fixture: ComponentFixture<CrmButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
