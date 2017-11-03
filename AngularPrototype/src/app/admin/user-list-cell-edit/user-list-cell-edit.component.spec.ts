import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListCellEditComponent } from './user-list-cell-edit.component';

describe('UserListCellEditComponent', () => {
  let component: UserListCellEditComponent;
  let fixture: ComponentFixture<UserListCellEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListCellEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListCellEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
