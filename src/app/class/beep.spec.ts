import { Beep } from './beep';

beforeEach( () => {
 

})

describe('Beep', () => {
  it('should create an instance', () => {
    let ac = new AudioContext();
    let outnode = new GainNode(ac);


    expect(new Beep(ac,outnode,110,20) ).toBeTruthy();
  });
});
