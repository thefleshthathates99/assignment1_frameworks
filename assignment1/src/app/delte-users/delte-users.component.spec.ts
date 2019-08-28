import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelteUsersComponent } from './delte-users.component';

describe('DelteUsersComponent', () => {
  let component: DelteUsersComponent;
  let fixture: ComponentFixture<DelteUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelteUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelteUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
