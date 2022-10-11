import { TestBed } from '@angular/core/testing';

import { AudiocontextService } from './audiocontext.service';

describe('AudiocontextService', () => {
  let service: AudiocontextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudiocontextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
