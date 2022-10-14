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
  scheduleInterval = 25; //the scheduling rate in ms
  intervalID:NodeJS.Timer|null = null;
  audioContext!:AudioContext;

  currentTimeInSeconds = 0;
  currentBeat = 1;

  nextNote:number = 0;

  startTime = 0;

  constructor(private ac:AudiocontextService) { }

  ngOnInit(): void {
    this.audioContext = this.ac.ac;
    console.log(this.ac.isPlaying);
  }

  startScheduler():void {
    if(!this.intervalID){
      this.startTime = this.audioContext.currentTime;

      this.intervalID = setInterval(() => {
        
        this.update(this.audioContext.currentTime-this.startTime);
        // console.log("Scheduler fire.");
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

  update(timeElapsed:number){

    let timePerBeat:number = 60/this.beatsPerMinute

    let beatsElapsed:number = timeElapsed/timePerBeat
    this.currentBeat = Math.floor(beatsElapsed);
    this.currentTimeInSeconds = timeElapsed;

    // console.log(timeElapsed);

  }



  togglePlay():void {
    if (!this.isPlaying) {
      this.startScheduler();
      this.isPlaying = true;
    }
    else {
      this.stopScheduler();
      this.isPlaying = false;
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
