import { TestBed } from '@angular/core/testing';

import { PlayQueueService } from './play-queue.service';

describe('PlayQueueService', () => {
  let service: PlayQueueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayQueueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
