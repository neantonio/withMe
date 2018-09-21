import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapTest } from './map-test';

@NgModule({
  declarations: [
    MapTest,
  ],
  imports: [
    IonicPageModule.forChild(MapTest),
  ],
  exports: [
    MapTest
  ]
})
export class MapTestModule {}
