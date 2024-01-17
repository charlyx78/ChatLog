import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendRequestButtonComponent } from './friend-request-button.component';

describe('FriendRequestButtonComponent', () => {
  let component: FriendRequestButtonComponent;
  let fixture: ComponentFixture<FriendRequestButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendRequestButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendRequestButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
