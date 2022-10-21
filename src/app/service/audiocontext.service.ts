import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Sound } from '../sound';
import { SoundEvent } from '../sound-event';

@Injectable({
  providedIn: 'root'
})
export class AudiocontextService {
  private _audioContext = new AudioContext();
  private _beatsPerMinute = 120;
  private _frameRate = 60;
  private _isPlaying = false;
  private _intervalID: NodeJS.Timer|null = null;
  private _startTime: number | null = null;
  private _playQueue:SoundEvent[] = [];
  private _lookeahead:number = 0.5;
  private _toSchedule:Set<SoundEvent> = new Set<SoundEvent>;

  private _mainVolume = 0.5;
  private _gainControl:GainNode;

  private _lastBeat:number = 0;

  public currentBeat:BehaviorSubject<number> = new BehaviorSubject(0);
  

  constructor(private ngZone: NgZone) {
    this._gainControl = this._audioContext.createGain();
    this._gainControl.gain.setValueAtTime(this._mainVolume,0);
    this._gainControl.connect(this.audioContext.destination);

   }

   public addSoundEvent(soundEvent:SoundEvent):void{
    this._playQueue.push(soundEvent);
    this._playQueue.sort((a,b) => b.beat - a.beat);
    return;
   }

   public removeSoundEvent(id:string):void {
    for (let i=0; i < this._playQueue.length; i++){
      if (this._playQueue[i].id === id) {
        this._playQueue.splice(i,1);
        return;
      }
    }
   }

  public get outputNode():AudioNode {
    return this._gainControl;
  } 

  public get mainVolume() { return this._mainVolume; }
  public set mainVolume(newVolume:number) {
    this._gainControl.gain.setValueAtTime(newVolume,this._audioContext.currentTime);
    this._mainVolume = newVolume;
  }

  public get audioContext() { return this._audioContext; }

  public get timeElapsed() { 
    return this._startTime ? this._audioContext.currentTime - this._startTime : 0;
  }

  public get timePerBeat() {
    return 60/this._beatsPerMinute;
  }

  public get beatsElapsed() {
    return this._isPlaying ? Math.floor(this.timeElapsed/this.timePerBeat) : 0;
  }

  public get beatsPerMinute() { return this._beatsPerMinute; }
  public set beatsPerMinute(newTempo:number) {
    if (this._isPlaying) { this.stop(); }
    this._beatsPerMinute = newTempo;
  }

  public get isPlaying() { return this._isPlaying; }

  public get frameRate() { return this._frameRate; }

  private _checkIfSoundEventIsInNextBeat(soundEvent:SoundEvent):boolean {
    // if (this._lastBeat - soundEvent.beat <= 1 && this._lastBeat - soundEvent.beat > 0) {
    //   console.log(`lastbeat ( ${this._lastBeat}) - soundevent-beat (${soundEvent.beat}) is between 0 and 1 (true).`);
    //   return true;
    // }

    if (soundEvent.repeat && ((this._lastBeat + (soundEvent.beat - 1 )) % (soundEvent.repeat) < 1 )){
        console.log(`lastbeat ( ${this._lastBeat}) + soundevent-beat (${soundEvent.beat}) % repeat (${soundEvent.repeat}) is smaller than 1 (true).`);
        return true;
      }
    console.log(`checkifisinnextbeat false with lastbeat: ${this._lastBeat}, repeat: ${soundEvent.repeat}, beat: ${soundEvent.beat}`)
    return false;
  }

  private _updateBeat(){
    let candidateBeat = Math.floor(this.timeElapsed/this.timePerBeat);
    if (candidateBeat != this._lastBeat ) {
      this.ngZone.run(() => {
        this._lastBeat = candidateBeat;
        this.currentBeat.next(this._lastBeat); 
      });

      this._playQueue.forEach((soundEvent) => {
        
            if(this._checkIfSoundEventIsInNextBeat(soundEvent)){
              console.log("Adding to Schedule: " + soundEvent.id)
              this._toSchedule.add(soundEvent);
            }
      })
    }

  }

  private _update() {
    this._updateBeat();
    this._toSchedule.forEach((soundEvent)=> {
      let scheduleBeat = soundEvent.repeat ? ((this._lastBeat) + (this._lastBeat+1) % soundEvent.repeat + soundEvent.beat) : soundEvent.beat;
      console.log("Playing Soundevent " + soundEvent.id + " at Beat " + scheduleBeat);
      soundEvent.sound.play(this._startTime!+scheduleBeat*this.timePerBeat);

    })
    this._toSchedule.clear();
 


    }
    

    

    



  public togglePlay(){
    if (this._isPlaying) {
      this.stop();
    }
    else {
      this.play(); 
    }
  }

  public play():void {
    if (!this._isPlaying) {
      this.ngZone.runOutsideAngular( () => {
        this._intervalID = setInterval(() => this._update(), Math.floor(1000/this._frameRate));
      })
      
      this._isPlaying = true;
      this._startTime = this._audioContext.currentTime;
      
    } 
  }

  public stop():void {
    if(this._intervalID) {
      clearInterval(this._intervalID);
      this._isPlaying = false;
      this._intervalID = null;
      this._startTime = null;
      this._lastBeat = 0;
    }
  }
}
