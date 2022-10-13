import { Component, Input, OnInit, ViewChild, ElementRef, OnChanges } from '@angular/core';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit, OnChanges {
   @Input() currentValue = 0;
   @ViewChild('canvas', { static: true }) 
   canvas!: ElementRef<HTMLCanvasElement>;  
   ctx!:CanvasRenderingContext2D|null; 
 

  ngOnInit(): void {
    
    this.ctx = this.canvas.nativeElement.getContext('2d');
   
  }

  ngOnChanges(): void {
    this.ctx?.clearRect(0,0,this.canvas.nativeElement.width,this.canvas.nativeElement.height);
    this.ctx?.fillRect(this.currentValue*50,0,50,50);

  }
  


}
