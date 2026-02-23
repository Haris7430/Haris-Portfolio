import { TestBed } from '@angular/core/testing';

import { ImagePreload } from './image-preload';

describe('ImagePreload', () => {
  let service: ImagePreload;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagePreload);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
