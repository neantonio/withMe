import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WalkDetailPage } from './walk-detail';

@NgModule({
  declarations: [
    WalkDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(WalkDetailPage),
  ],
  exports: [
    WalkDetailPage
  ]
})
export class WalkDetailPageModule {}
