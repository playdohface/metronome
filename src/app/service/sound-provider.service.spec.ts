import { TestBed } from '@angular/core/testing';

import { SoundProviderService } from './sound-provider.service';

describe('SoundProviderService', () => {
  let service: SoundProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoundProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
