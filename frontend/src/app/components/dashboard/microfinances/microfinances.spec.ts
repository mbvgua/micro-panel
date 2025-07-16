import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Microfinances } from './microfinances';

describe('Microfinances', () => {
  let component: Microfinances;
  let fixture: ComponentFixture<Microfinances>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Microfinances]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Microfinances);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
