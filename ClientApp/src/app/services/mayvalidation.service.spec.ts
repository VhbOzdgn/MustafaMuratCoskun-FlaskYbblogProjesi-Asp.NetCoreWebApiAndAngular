import { TestBed } from '@angular/core/testing';

import { MayvalidationService } from './mayvalidation.service';

describe('MayvalidationService', () => {
  let service: MayvalidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MayvalidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
