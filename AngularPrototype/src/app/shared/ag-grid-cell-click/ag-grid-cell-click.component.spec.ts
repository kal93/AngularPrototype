import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridCellClickComponent } from './ag-grid-cell-click.component';

describe('AgGridCellClickComponent', () => {
  let component: AgGridCellClickComponent;
  let fixture: ComponentFixture<AgGridCellClickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgGridCellClickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridCellClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
