import { NgModule } from '@angular/core';

import { Translate } from './translate'


@NgModule({
  declarations: [
    Translate,
  ],
  
  exports: [
   Translate
  ],
 
})
export class PipeModule {}
