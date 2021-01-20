import { TestBed } from '@angular/core/testing';

import { HandleApiErrorsInterceptor } from './handle-api-errors.interceptor';

describe('HandleApiErrorsInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HandleApiErrorsInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HandleApiErrorsInterceptor = TestBed.inject(HandleApiErrorsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
