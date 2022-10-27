import { Injectable, NgZone } from '@angular/core';

import { SoundEvent } from '../sound-event';

@Injectable({
  providedIn: 'root'
})

// the Audio Engine, responsible for scheduling Sounds and single source of truth
// for everything related to time. 
export class AudioEngineService {

  private _audioContext:AudioContext;
  private _loopTime:number = 2; //the length of a loop in seconds
  private _isPlaying:boolean = false;
  private _startTime:number = 0; // the time at which the current playback started
  private _soundEvents:SoundEvent[] = [];

  private _mainOut:GainNode;
  private _mainVolume = 0.5;


  private _fps:number = 30; //this is how often (in times per second) scheduling is run. 
  private _intervalID:NodeJS.Timeout|null = null;

  constructor(private ngZone:NgZone ) {
    this._audioContext = new AudioContext();
    this._mainOut = this._audioContext.createGain();
    this._mainOut.gain.setValueAtTime(this._mainVolume,0);
    this._mainOut.connect(this.audioContext.destination);
   }

   public get mainOut () {
    return this._mainOut;
   }

  public get isPlaying(){
    return this._isPlaying;
  }

  public get loopTime(){
    return this._loopTime;
  }

  

  public get audioContext() {
    return this._audioContext;
  }

  public get loopCount(){
      return Math.floor(this.timeElapsed/this._loopTime);   
  }

  public get timeElapsed(){
    return this._audioContext.currentTime-this._startTime;
  }

  public get timeInLoop(){
    return this.timeElapsed - this._loopTime*this.loopCount;
  }

  private get lookAhead():number{
    return 2/this._fps; //lookahead in milliseconds should be larger than 1/fps to avoid scheduling errors.
  }

  private _update():void {
    // this is where all the code goes that is executed each frame
    

      this._soundEvents.forEach((soundEvent)=> {
        let scheduleTime = this._startTime + this.loopCount*this._loopTime + soundEvent.timeInLoop*this._loopTime
        if (soundEvent.lastLoop < this.loopCount && scheduleTime - this._audioContext.currentTime <= this.lookAhead){
          soundEvent.sound.play(scheduleTime);
          soundEvent.lastLoop = this.loopCount;
        }
         
      })  
  }

  public play():void {
    this._startTime = this._audioContext.currentTime;
    this._isPlaying = true;

    this._update();
    this.ngZone.runOutsideAngular(()=> {
      this._intervalID = setInterval(() => {
        this._update();
      }, Math.floor(1000/this._fps));
    });

  }

  public stop():void {
    if (this._intervalID) clearInterval(this._intervalID);
    this._intervalID = null;
    this._isPlaying = false;
    this._startTime = 0;
    this._soundEvents.forEach((s)=> s.lastLoop = -1);
  }

  public togglePlay():void {
    if (this._isPlaying) this.stop();
    else this.play();
  }

  public addSoundEvent(soundEvent:SoundEvent):void{
    this._soundEvents.push(soundEvent);   
   }

   public removeSoundEvent(id:string):void {
    for (let i=0; i < this._soundEvents.length; i++){
      if (this._soundEvents[i].id === id) {
        this._soundEvents.splice(i,1);
        return;
      }
    }
   }


}
