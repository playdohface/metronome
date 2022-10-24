import { TestBed } from '@angular/core/testing';

import { AudioEngineService } from './audio-engine.service';

describe('AudioEngineService', () => {
  let service: AudioEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
