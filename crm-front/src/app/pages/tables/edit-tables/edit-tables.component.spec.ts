import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTablesComponent } from './edit-tables.component';

describe('EditTablesComponent', () => {
  let component: EditTablesComponent;
  let fixture: ComponentFixture<EditTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
