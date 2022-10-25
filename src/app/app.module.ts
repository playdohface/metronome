import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MetronomeComponent } from './metronome/metronome.component';

import { VisualizationComponent } from './visualization/visualization.component';
import { LaneViewDirective } from './directive/lane-view.directive';
import { ClickLaneComponent } from './component/click-lane/click-lane.component';
import { AudioEngineService } from './service/audio-engine.service';
import { SoundProviderService } from './service/sound-provider.service';


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
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AudioEngineService, SoundProviderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
