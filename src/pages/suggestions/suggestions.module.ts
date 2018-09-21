import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Suggestions } from './suggestions';

@NgModule({
  declarations: [
    Suggestions,
  ],
  imports: [
    IonicPageModule.forChild(Suggestions),
  ],
  exports: [
    Suggestions
  ]
})
export class SuggestionsModule {}
