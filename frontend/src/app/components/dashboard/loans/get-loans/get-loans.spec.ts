import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetLoans } from './get-loans';

describe('GetLoans', () => {
  let component: GetLoans;
  let fixture: ComponentFixture<GetLoans>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetLoans]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetLoans);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
