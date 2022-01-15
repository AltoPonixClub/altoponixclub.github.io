import { TestBed } from '@angular/core/testing';

import { BackendBaseService } from './backendbase.service';

describe('BackendService', () => {
  let service: BackendBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
