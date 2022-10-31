import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AudioEngineService } from 'src/app/service/audio-engine.service';

@Component({
  selector: 'app-tap-tempo',
  templateUrl: './tap-tempo.component.html',
  styleUrls: ['./tap-tempo.component.css']
})
export class TapTempoComponent implements OnInit {

  @Output() newTempo = new EventEmitter<number>();

  private _lastTimeClicked:number = 0;

  constructor(private audioEngine:AudioEngineService) { }

  ngOnInit(): void {
  }

  buttonHandler(){
    if (!this._lastTimeClicked) {
      this._lastTimeClicked = this.audioEngine.audioContext.currentTime;
      return;
    } else {
      let newTempo = 60/(this.audioEngine.audioContext.currentTime - this._lastTimeClicked);
      this.newTempo.emit(newTempo);
      this._lastTimeClicked = this.audioEngine.audioContext.currentTime;

    }
  }

}
