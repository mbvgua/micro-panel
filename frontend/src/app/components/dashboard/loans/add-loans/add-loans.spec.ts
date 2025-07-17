import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoans } from './add-loans';

describe('AddLoans', () => {
  let component: AddLoans;
  let fixture: ComponentFixture<AddLoans>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLoans]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLoans);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
