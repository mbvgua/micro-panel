import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLoans } from './update-loans';

describe('UpdateLoans', () => {
  let component: UpdateLoans;
  let fixture: ComponentFixture<UpdateLoans>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateLoans]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLoans);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
