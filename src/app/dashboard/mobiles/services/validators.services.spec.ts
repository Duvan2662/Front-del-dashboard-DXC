import { TestBed } from '@angular/core/testing';

import { ValidatorsServices } from './validators.services';

describe('ValidatorsServices', () => {
  let service: ValidatorsServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidatorsServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
