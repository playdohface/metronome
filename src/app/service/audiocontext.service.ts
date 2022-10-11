import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudiocontextService {
  public ac = new AudioContext();

  constructor() { }
}
