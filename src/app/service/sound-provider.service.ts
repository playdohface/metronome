import { Injectable } from '@angular/core';
import { Beep } from '../class/beep';
import { Sound } from '../sound';
import { AudioEngineService } from './audio-engine.service';

@Injectable({
  providedIn: 'root'
})
export class SoundProviderService {
  // private _soundList:Sound[] = [
  //   new Beep(this.ac.audioContext,this.ac.mainOut,600,0.05,"High Beep"),
  //   new Beep(this.ac.audioContext,this.ac.mainOut,400,0.05,"Mid Beep"),
  //   new Beep(this.ac.audioContext,this.ac.mainOut,200,0.05,"Low Beep")
  // ];

  constructor(private ac:AudioEngineService) { }

  public makeSoundInstances(){
    return [
      new Beep(this.ac.audioContext,this.ac.mainOut,600,0.05,"High Beep"),
      new Beep(this.ac.audioContext,this.ac.mainOut,400,0.05,"Mid Beep"),
      new Beep(this.ac.audioContext,this.ac.mainOut,200,0.05,"Low Beep")
    ];

  }

 



}
