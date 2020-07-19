import { TestBed } from '@angular/core/testing';

import { ProductManagerService } from './product-manager.service';

describe('ProductManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductManagerService = TestBed.get(ProductManagerService);
    expect(service).toBeTruthy();
  });
});
