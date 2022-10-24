import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MetronomeComponent } from './metronome/metronome.component';
import { AudiocontextService } from './service/audiocontext.service';
import { VisualizationComponent } from './visualization/visualization.component';
import { LaneViewDirective } from './directive/lane-view.directive';
import { ClickLaneComponent } from './component/click-lane/click-lane.component';
import { AudioEngineService } from './service/audio-engine.service';


@NgModule({
  declarations: [
    AppComponent,
    MetronomeComponent,
    VisualizationComponent,
    LaneViewDirective,
    ClickLaneComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [AudiocontextService, AudioEngineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
