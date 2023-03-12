import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsgridComponent } from './productsgrid.component';

describe('ProductsgridComponent', () => {
  let component: ProductsgridComponent;
  let fixture: ComponentFixture<ProductsgridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsgridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
