import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Beep } from '../class/beep';
import { SoundEvent } from '../sound-event';
import { LaneViewDirective } from '../directive/lane-view.directive';
import { VisualizationComponent } from '../visualization/visualization.component';
import { AudioEngineService } from '../service/audio-engine.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-metronome',
  templateUrl: './metronome.component.html',
  styleUrls: ['./metronome.component.css']
})
export class MetronomeComponent implements OnInit {
  @ViewChild(LaneViewDirective, {static: true}) laneViews!: LaneViewDirective;
  audioContext!:AudioContext;
 
  public volumeSlider:number = 75;
  public tempoSlider:number = 120;

  constructor(public ac:AudioEngineService) { 
    
    this.audioContext = ac.audioContext;
  }

  ngOnInit(): void {
    this.addNewLane("4",false);
    
  }

  setVolume(newVolume:string):void {

    this.ac.mainVolume = parseInt(newVolume)/100;
  }

  tapTempo(newTempo:number){
    if (newTempo < 30 || newTempo > 400) return;
    this.ac.bpm = Math.round(newTempo);
    this.tempoSlider = Math.round(newTempo);
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
    
  }



}
