import { Sound } from "./sound";

export class SoundEvent {
    constructor(
        private _id:string,
        private _sound:Sound,
        private _timeInLoop:number,  
        private _playEvery:number = 1,
        public lastLoop:number = -1
        ){};

        

        public isPlayedInLoop(num:number):boolean{
            if (this.lastLoop === -1) return true;
            if (num === this.lastLoop) return false;
            if (num === this.lastLoop - 1) return false; 
            
            return !(num%this._playEvery)
        }

        public get playEvery(){
            return this._playEvery;
        }
    
        public get id() {
            return this._id
        }

        public get sound() {
            return this._sound
        }

        public get timeInLoop(){
            return this._timeInLoop;
        }
}
