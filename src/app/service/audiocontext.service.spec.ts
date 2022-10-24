// import { TestBed } from '@angular/core/testing';
// import { Action } from 'rxjs/internal/scheduler/Action';
// import { Beep } from '../class/beep';
// import { SoundEvent } from '../sound-event';

// import { AudiocontextService } from './audiocontext.service';

// describe('AudiocontextService', () => {
//   let service: AudiocontextService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(AudiocontextService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('plays and pauses', () => {
//     expect(service.isPlaying).toBeFalse();
//     service.play();
//     expect(service.isPlaying).toBeTrue();
//     service.stop();
//     expect(service.isPlaying).toBeFalse();
//   })

//   it('keeps SoundEvents in descending order by beat', () => {
//     let beep = new Beep(service.audioContext,service.outputNode);
//     let event1 = new SoundEvent("event1",beep,1);
//     let event2 = new SoundEvent("event2",beep,2);
//     service.addSoundEvent(event1);
//     service.addSoundEvent(event2);
//     expect(service["_playQueue"][1]).toEqual(event1);
//     service.removeSoundEvent("event2");
//     expect(service["_playQueue"][0]).toEqual(event1);

//   })
// });
