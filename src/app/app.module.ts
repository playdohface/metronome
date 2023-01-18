import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { MetronomeComponent } from './metronome/metronome.component';

import { VisualizationComponent } from './visualization/visualization.component';
import { LaneViewDirective } from './directive/lane-view.directive';

import { AudioEngineService } from './service/audio-engine.service';
import { SoundProviderService } from './service/sound-provider.service';
import { TapTempoComponent } from './component/tap-tempo/tap-tempo.component';
import { FileLoaderService } from './service/file-loader.service';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    AppComponent,
    MetronomeComponent,
    VisualizationComponent,
    LaneViewDirective,
    TapTempoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot()
  ],
  providers: [AudioEngineService, SoundProviderService, FileLoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
