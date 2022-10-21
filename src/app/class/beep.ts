import { Sound } from "../sound";

export class Beep implements Sound {
    osc:OscillatorNode;
    
    constructor(private audioContext:AudioContext,
                private outputNode:AudioNode,
                private frequency:number = 440,
                private duration:number = 0.2 ) {
        
        this.osc = audioContext.createOscillator()       
        this.osc.frequency.setValueAtTime(frequency,0);
        this.osc.connect(outputNode);

    }

    play(startTime:number):void {

        this.osc.start(startTime);
        this.osc.stop(startTime + this.duration);
        this._reset();
    }

    private _reset(){
        this.osc = this.audioContext.createOscillator()       
        this.osc.frequency.setValueAtTime(this.frequency,0);
        this.osc.connect(this.outputNode);

    }
}
