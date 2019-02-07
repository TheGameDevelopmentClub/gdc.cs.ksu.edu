import { TestBed, async, inject } from '@angular/core/testing';

import { AuthCheckGuard } from './auth-check.guard';

describe('AuthCheckGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthCheckGuard]
    });
  });

  it('should ...', inject([AuthCheckGuard], (guard: AuthCheckGuard) => {
    expect(guard).toBeTruthy();
  }));
});
