import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileLoaderService {
  private _cache: {[key:string]: Promise<AudioBuffer>} = {};
  constructor(private http:HttpClient) { }

  public async loadFile(url:string,audioContext:AudioContext):Promise<AudioBuffer>{
    if(!this._cache[url]){
      
      await lastValueFrom (this._getFile(url)).then((data) => {
        this._cache[url] = audioContext.decodeAudioData(data)
      })
      
    }
    return this._cache[url];
  }

  private _getFile(url:string):Observable<ArrayBuffer> {
   
    return this.http.get(url, {responseType: 'arraybuffer'})
  }
}

