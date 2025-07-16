import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMicrofinances } from './get-microfinances';

describe('GetMicrofinances', () => {
  let component: GetMicrofinances;
  let fixture: ComponentFixture<GetMicrofinances>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetMicrofinances]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetMicrofinances);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
