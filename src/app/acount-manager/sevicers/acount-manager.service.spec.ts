import { TestBed } from '@angular/core/testing';

import { AcountManagerService } from './acount-manager.service';

describe('AcountManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AcountManagerService = TestBed.get(AcountManagerService);
    expect(service).toBeTruthy();
  });
});
