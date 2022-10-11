import { Component, OnInit } from '@angular/core';
import { AudiocontextService } from '../service/audiocontext.service';


@Component({
  selector: 'app-metronome',
  templateUrl: './metronome.component.html',
  styleUrls: ['./metronome.component.css']
})
export class MetronomeComponent implements OnInit {
  beatsPerMinute:number = 120;
  isPlaying = false;
  scheduleInterval = 100; //the scheduling rate in ms
  intervalID:NodeJS.Timer|null = null;
  audioContext!:AudioContext;

  currentTimeInSeconds = 0;
  currentBeat = 1;

  nextNote:number = 0;

  startTime = 0;

  constructor(private ac:AudiocontextService) { }

  ngOnInit(): void {
    this.audioContext = this.ac.ac;
  }

  startScheduler():void {
    if(!this.intervalID){
      this.startTime = this.audioContext.currentTime;

      this.intervalID = setInterval(() => {
        let beatsPerSecond:number = (this.beatsPerMinute/60);
        let secondsPerBeat:number = 1/beatsPerSecond;

        let timeSinceLastBeat:number = ((this.audioContext.currentTime - this.startTime) % secondsPerBeat);
        let nextClick:number = this.audioContext.currentTime + (secondsPerBeat - timeSinceLastBeat);

        this.currentTimeInSeconds = (this.audioContext.currentTime-this.startTime);

        if (nextClick != this.nextNote) {
          this.playSound(this.audioContext,nextClick);
          this.currentBeat += 1;
          this.nextNote = nextClick;
        }
        console.log(nextClick)

        console.log("Scheduler fire.");
      }, this.scheduleInterval);
    }
    else {console.log("Error, there appears to be another Scheduler running.")}
  }

  stopScheduler():void {
    if(this.intervalID) {
      clearInterval(this.intervalID);
      this.intervalID = null;
    }
  }

  togglePlay():void {
    if (!this.isPlaying) {
      this.startScheduler();
      this.isPlaying = !this.isPlaying;
    }
    else {
      this.stopScheduler();
      this.isPlaying = !this.isPlaying;
    }
  }

  playSound(aCtx:AudioContext, when:number):void{
    console.log("Play Sound.")
    const primaryGainControl = aCtx.createGain();
    primaryGainControl.gain.setValueAtTime(0.5,when);
    primaryGainControl.connect(aCtx.destination);

    

    const kickOscillator = aCtx.createOscillator();
    kickOscillator.frequency.setValueAtTime(220,0);
    kickOscillator.connect(primaryGainControl);
    kickOscillator.start(when);
    kickOscillator.stop(when + 0.1);
  
  }

  setTempo(event:Event){
    console.log(event);
  }

}
