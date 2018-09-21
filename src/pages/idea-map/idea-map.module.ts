import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IdeaMap } from './idea-map';

@NgModule({
  declarations: [
    IdeaMap,
  ],
  imports: [
    IonicPageModule.forChild(IdeaMap),
  ],
  exports: [
    IdeaMap
  ]
})
export class IdeaMapModule {}
