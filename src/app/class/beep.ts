import { Sound } from "../sound";

export class Beep implements Sound {
    osc:OscillatorNode;
    private _connections:AudioNode[];
    
    
    constructor(private _audioContext:AudioContext,
                private _outputNode:AudioNode,
                private _frequency:number = 440,
                private _duration:number = 0.2,
                private _name?:string ) {
        
        
        this.osc = _audioContext.createOscillator()       
        this.osc.frequency.setValueAtTime(_frequency,0);
        this._connections = [this.osc];
        this._connectAll();

    }

    public get name():string {
        return this._name ? this._name : "Beep at " + this._frequency.toString() + " Hz" 
    }

    public set outputNode(newOut: AudioNode) {
        this._outputNode = newOut;
        this._reset();       
    }

    play(startTime:number):void {
        this.osc.start(startTime);
        this.osc.stop(startTime + this._duration);
        this._reset();
    }

    private _connectAll():void {
        this._connections = [this.osc as AudioNode];       
        for (let i = 0; i < this._connections.length; i++){
            if ( i == this._connections.length-1 ){
                this._connections[i].connect(this._outputNode);
            } else {
                this._connections[i].connect(this._connections[i+1]);
            }
        }
    }

    private _reset(){
        this.osc = this._audioContext.createOscillator()       
        this.osc.frequency.setValueAtTime(this._frequency,0);
        this._connectAll();
    }
}
