import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MapJs } from './map-js';

@NgModule({
  declarations: [
    MapJs,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    MapJs
  ]
})
export class MapJsModule {}
