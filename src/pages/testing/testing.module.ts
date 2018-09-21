import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Testing } from './testing';
import {PipeModule} from '../../pipes/pipe.module'
import {SharedComponentsModule} from '../../components/shared-components.module'
import { LongPressModule } from 'ionic-long-press';
import {PrettyJsonModule} from 'angular2-prettyjson';



@NgModule({
  declarations: [
    Testing,
      
  ],
  imports: [
    //SharedModule, 
    PrettyJsonModule,
     LongPressModule,
    SharedComponentsModule,
    IonicPageModule.forChild(Testing),
    PipeModule
  ],
  exports: [
    Testing
  ],
  providers:[
   
  ]
})
export class TestingModule {}
