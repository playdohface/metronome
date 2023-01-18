export interface Sound {
    play(startTime:number):void;
    name:string;
    set outputNode(newOut:AudioNode);
}
