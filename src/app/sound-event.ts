import { Sound } from "./sound";

export class SoundEvent {
    constructor(
        private _id:string,
        public sound:Sound,
        public beat:number,
        public repeat?:number ){};
    
        public get id() {return this._id}
}
