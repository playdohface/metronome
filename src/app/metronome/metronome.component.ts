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
    this.ac.addSoundEvent(new SoundEvent("Hello",this.beep,0));  
  }



  addNewLane(subdivs:string){
    console.log(`Adding new lane with ${subdivs} subdivisions.`)
    let subdivsnum = parseInt(subdivs);
    const viewContainerRef = this.laneViews.viewContainerRef;
    const componentRef = viewContainerRef.createComponent(VisualizationComponent);
    componentRef.instance.subdivisions = subdivsnum;
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
