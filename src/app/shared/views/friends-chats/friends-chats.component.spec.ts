import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsChatsComponent } from './friends-chats.component';

describe('FriendsChatsComponent', () => {
  let component: FriendsChatsComponent;
  let fixture: ComponentFixture<FriendsChatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsChatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendsChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
