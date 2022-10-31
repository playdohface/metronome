import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Beep } from '../class/beep';
import { SoundEvent } from '../sound-event';
import { LaneViewDirective } from '../directive/lane-view.directive';
import { VisualizationComponent } from '../visualization/visualization.component';
import { AudioEngineService } from '../service/audio-engine.service';

@Component({
  selector: 'app-metronome',
  templateUrl: './metronome.component.html',
  styleUrls: ['./metronome.component.css']
})
export class MetronomeComponent implements OnInit {
  @ViewChild(LaneViewDirective, {static: true}) laneViews!: LaneViewDirective;


  audioContext!:AudioContext;

  currentTimeInSeconds = 0;
  currentBeat = 1;

  nextNote:number = 0;

  startTime = 0;



  beep:Beep;

  constructor(public ac:AudioEngineService) { 
    
    this.audioContext = ac.audioContext;

    this.beep = new Beep(this.audioContext, this.ac.mainOut, 300, 0.2);
    //ac.currentBeat.subscribe((value) => this.currentBeat = value )
  }

  ngOnInit(): void {
    this.audioContext = this.ac.audioContext;
    this.addNewLane("4",false);
    
  }

  setVolume(newVolume:string):void {

    this.ac.mainVolume = parseInt(newVolume)/100;
  }

  tapTempo(newTempo:number){
    if (newTempo < 30 || newTempo > 400) return;
    this.ac.bpm = newTempo;
  }

  setBpm(newBpm:string){
    this.ac.bpm = parseInt(newBpm);
  }

  addNewLane(subdivs:string, activedefault:boolean = true){
    let subdivsnum = parseInt(subdivs);
    const viewContainerRef = this.laneViews.viewContainerRef;
    const componentRef = viewContainerRef.createComponent(VisualizationComponent);
    componentRef.instance.subdivisions = subdivsnum;
    componentRef.instance.activedefault = activedefault;
    componentRef.instance.delete$.subscribe((e) => {
      if (e) {
        componentRef.destroy();
      }
    })
    
    
    //componentRef.instance.buttonStates.subscribe((e) => this.registerSoundEvents(e));

  }

  playSound(aCtx:AudioContext, when:number):void{
    console.log("Play Sound.")
    this.beep.play(this.audioContext.currentTime);
  
  }


}
