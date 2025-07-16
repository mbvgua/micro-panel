import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMicrofinances } from './update-microfinances';

describe('UpdateMicrofinances', () => {
  let component: UpdateMicrofinances;
  let fixture: ComponentFixture<UpdateMicrofinances>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMicrofinances]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMicrofinances);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
