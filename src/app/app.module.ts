import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MetronomeComponent } from './metronome/metronome.component';
import { AudiocontextService } from './service/audiocontext.service';
import { VisualizationComponent } from './visualization/visualization.component';
import { LaneViewDirective } from './directive/lane-view.directive';


@NgModule({
  declarations: [
    AppComponent,
    MetronomeComponent,
    VisualizationComponent,
    LaneViewDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [AudiocontextService],
  bootstrap: [AppComponent]
})
export class AppModule { }
