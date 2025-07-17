import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUsers } from './update-users';

describe('UpdateUsers', () => {
  let component: UpdateUsers;
  let fixture: ComponentFixture<UpdateUsers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateUsers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUsers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
