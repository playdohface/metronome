import { Injectable } from '@angular/core';
import { Beep } from '../class/beep';
import { SoundFile } from '../class/sound-file';
import { Sound } from '../sound';
import { AudioEngineService } from './audio-engine.service';
import { FileLoaderService } from './file-loader.service';

@Injectable({
  providedIn: 'root'
})
export class SoundProviderService {


  constructor(private ac:AudioEngineService, private loader:FileLoaderService) { }

  public makeSoundInstances(){
    return [
      new SoundFile(this.loader,"assets/sound/CLICK.WAV", this.ac.audioContext,this.ac.mainOut, "Click"),
      new Beep(this.ac.audioContext,this.ac.mainOut,600,0.05,"High Beep"),
      new Beep(this.ac.audioContext,this.ac.mainOut,400,0.05,"Mid Beep"),
      new Beep(this.ac.audioContext,this.ac.mainOut,200,0.05,"Low Beep"),
      
    ];

  }

 



}
