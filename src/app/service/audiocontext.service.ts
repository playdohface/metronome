import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudiocontextService {
  public ac = new AudioContext();
  private beatsPerMinute = 120;
  private _frameRate = 60;
  private _isPlaying = false;
  private _intervalID: NodeJS.Timer|null = null;
  private _startTime: number | null = null;
  

  constructor(private ngZone: NgZone) { }

  public get isPlaying() { return this._isPlaying; }

  public get frameRate() { return this._frameRate; }

  private _update() {

    console.log("Update called");

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
      this._intervalID = setInterval(this._update, Math.floor(1000/this._frameRate));
      }
      )
      this._isPlaying = true;
      this._startTime = this.ac.currentTime;
      
    } 
  }

  public stop():void {
    if(this._intervalID) {
      clearInterval(this._intervalID);
      this._isPlaying = false;
      this._intervalID = null;
      this._startTime = null;
    }
  }
}
