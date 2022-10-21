import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { AudiocontextService } from '../service/audiocontext.service';
import { Beep } from '../class/beep';
import { SoundEvent } from '../sound-event';
import { LaneViewDirective } from '../directive/lane-view.directive';
import { VisualizationComponent } from '../visualization/visualization.component';

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

  gainControl:GainNode;

  beep:Beep;

  constructor(public ac:AudiocontextService) { 
    
    this.audioContext = ac.audioContext;
    this.gainControl = this.audioContext.createGain();
    this.gainControl.gain.setValueAtTime(0.5,0);
    this.gainControl.connect(this.audioContext.destination);
    this.beep = new Beep(this.audioContext, this.gainControl, 300, 0.2);
    ac.currentBeat.subscribe((value) => this.currentBeat = value )
  }

  ngOnInit(): void {
    this.audioContext = this.ac.audioContext;
    this.ac.addSoundEvent(new SoundEvent("Hello",this.beep,1,4));

    
  
  }

  registerSoundEvents(event:boolean[]):void{
    console.log(event);
  }

  addNewLane(subdivs:string){
    console.log(`Adding new lane with ${subdivs} subdivisions.`)
    let subdivsnum = parseInt(subdivs);
    const viewContainerRef = this.laneViews.viewContainerRef;
    const componentRef = viewContainerRef.createComponent(VisualizationComponent);
    componentRef.instance.subdivisions = subdivsnum;
    
    
    componentRef.instance.buttonStates.subscribe((e) => this.registerSoundEvents(e));

  }

  playSound(aCtx:AudioContext, when:number):void{
    console.log("Play Sound.")
    this.beep.play(this.audioContext.currentTime);
  
  }


}
