import { Sound } from "./sound";

export class SoundEvent {
    constructor(
        private _id:string,
        private _sound:Sound,
        private _timeInLoop:number,
        public lastLoop:number = -1
        ){};
    
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
