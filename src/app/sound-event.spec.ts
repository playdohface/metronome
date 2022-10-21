import { SoundEvent } from './sound-event';
import { Beep } from './class/beep'

describe('SoundEvent', () => {
  it('should create an instance', () => {
    let ac = new AudioContext();
    let outnode = new GainNode(ac);
    let beep = new Beep(ac,outnode);
    expect(new SoundEvent("lalala", beep, 2)).toBeTruthy();
  });
});
