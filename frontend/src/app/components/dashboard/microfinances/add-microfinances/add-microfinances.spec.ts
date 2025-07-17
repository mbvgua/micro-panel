import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMicrofinances } from './add-microfinances';

describe('AddMicrofinances', () => {
  let component: AddMicrofinances;
  let fixture: ComponentFixture<AddMicrofinances>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMicrofinances]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMicrofinances);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
