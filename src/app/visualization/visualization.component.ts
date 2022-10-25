import { Component, Input, OnInit, ViewChild, ElementRef, OnChanges, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Beep } from '../class/beep';
import { Sound } from '../sound';
import { AudioEngineService } from '../service/audio-engine.service';
import { SoundEvent } from '../sound-event';
import { v4 } from 'uuid';
import { SoundProviderService } from '../service/sound-provider.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit, OnChanges {
  currentValue = 0;
  @Input() subdivisions!:number;
  public soundChoice = new FormGroup({
    soundSelect: new FormControl()
  })
  
  
  private _sound!:Sound;
  private _globalId = v4();

  


  


  buttons = [{"active" : false, "current" : false}];

  constructor(
    private ac:AudioEngineService,
    public s:SoundProviderService
    ) {} 
  

  ngOnInit(): void {      
    this.makeButtons();
    this.soundChoice.valueChanges.subscribe((newVal) => {
      console.log(newVal.soundSelect);
      this.selectSound(newVal.soundSelect);

    })
    
   
    // this.ac.currentBeat.subscribe((value) => {
    //   this.currentValue = value; 
    //   this.updateButtons();
    // });
  }

  ngOnChanges(): void { 
    
  }

  ngOnDestroy(){
    // this.ac.currentBeat.unsubscribe();

  }

  public selectSound(newSound:Sound){
    this._sound = newSound;
    for (let i = 0; i < this.buttons.length; i++) {
      if (this.buttons[i]['active'] === true) {
        this.ac.removeSoundEvent(this._getButtonId(i));
        let newSound = new SoundEvent(this._getButtonId(i), this._sound! ,i/this.subdivisions);
        this.ac.addSoundEvent(newSound);
      }

    }
  }

  updateButtons():void{
    this.buttons.forEach ((button) => button['current'] = false);
    this.buttons[this.currentValue%this.subdivisions]["current"] = true;

  }

  makeButtons(){
    for (let i = 0; i < this.subdivisions; i++ )
    {
      this.buttons[i] = {"active":false, "current":false}
    }
  }

  private _getButtonId(id:number):string {
    return this._globalId + "_" + id.toString();
  }

  buttonHandler(id:number) {
    if (this.buttons[id]["active"] === false) {
      this.buttons[id]["active"] = true;
      let newSound = new SoundEvent(this._getButtonId(id), this._sound! ,id/this.subdivisions);
      this.ac.addSoundEvent(newSound);

    } else {
      this.buttons[id]["active"] = false;
      this.ac.removeSoundEvent(this._getButtonId(id));
    }
    
    
    
    
  }
  


}
