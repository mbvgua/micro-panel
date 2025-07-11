import { TestBed } from '@angular/core/testing';

import { Microfinances } from './microfinances';

describe('Microfinances', () => {
  let service: Microfinances;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Microfinances);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
