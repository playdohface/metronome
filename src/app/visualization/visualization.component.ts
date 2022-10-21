import { Component, Input, OnInit, ViewChild, ElementRef, OnChanges, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AudiocontextService } from '../service/audiocontext.service';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit, OnChanges {
  currentValue = 0;
  @Input() subdivisions!:number;

  @Output() buttonStates:EventEmitter<boolean[]> = new EventEmitter<boolean[]>;


  buttons = [{"active" : false, "current" : false}];

  constructor(private ac:AudiocontextService) {
    
    
  }

  ngOnInit(): void {      
    this.makeButtons();
    this.ac.currentBeat.subscribe((value) => {
      this.currentValue = value;
      this.updateButtons();
    });
  }

  ngOnChanges(): void { 
  }

  ngOnDestroy(){
    this.ac.currentBeat.unsubscribe();

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

  buttonHandler(id:number) {
    this.buttons[id]["active"] = !this.buttons[id]["active"] ;
    let newButtonStates:boolean[] = [];
    for ( let button of this.buttons) {
      newButtonStates = newButtonStates.concat([button["active"]]);
    }
    this.buttonStates.emit(newButtonStates);
    
  }
  


}
