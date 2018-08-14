import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTodoDashboardComponent } from './user-todo-dashboard.component';

describe('UserTodoDashboardComponent', () => {
  let component: UserTodoDashboardComponent;
  let fixture: ComponentFixture<UserTodoDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTodoDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTodoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
