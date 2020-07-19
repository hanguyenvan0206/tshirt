import { TestBed, async, inject } from '@angular/core/testing';

import { ControlGuard } from './control.guard';

describe('ControlGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ControlGuard]
    });
  });

  it('should ...', inject([ControlGuard], (guard: ControlGuard) => {
    expect(guard).toBeTruthy();
  }));
});
