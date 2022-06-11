import { TestBed } from '@angular/core/testing';

import { PredictImageService } from './predict-image.service';

describe('PredictImageService', () => {
  let service: PredictImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PredictImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
