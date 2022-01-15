import { TestBed } from '@angular/core/testing';

import { BackendDataService } from './backenddata.service';

describe('BackendDataService', () => {
  let service: BackendDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
