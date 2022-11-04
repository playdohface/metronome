import { FileLoaderService } from "../service/file-loader.service";
import { Sound } from "../sound";

export class SoundFile implements Sound {
    private _data:AudioBuffer | null = null;
    private _sourceNode:AudioBufferSourceNode;
    constructor(
        private loader:FileLoaderService,
        private _url:string,
        private _audioContext:AudioContext,
        private _outputNode:AudioNode,
        private _name?:string)
        {    
            loader.loadFile(_url,_audioContext).then(data => this._data = data);    
        
            this._sourceNode = _audioContext.createBufferSource()
        }
    
    public set outputNode(newOut: AudioNode) {
       this._outputNode = newOut; 
    }   

    public get outputNode(){
        return this._outputNode;
    } 

    public get name():string{
        return this._name ? this._name : this._url;
    }

    private _reset(){
        this._sourceNode = this._audioContext.createBufferSource();


    }

    public play(startTime: number): void {
        if (this._data){
            this._sourceNode.buffer = this._data;
            this._sourceNode.connect(this._outputNode);
            this._sourceNode.start(startTime);
            this._reset();
        } else {
            console.log("Loading " + this.name);
        }
        
    }
}
