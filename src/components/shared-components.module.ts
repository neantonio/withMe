import { NgModule } from '@angular/core';
import {IdeaModal} from './idea-modal/idea-modal';
import { CommonModule } from '@angular/common';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import {IdeaWorkTime} from './idea-work-time/idea-work-time'
import { IdeaPriceAndBuy } from './idea-price-and-buy/idea-price-and-buy'
import {PipeModule} from '../pipes/pipe.module'
import { IdeaComment } from './idea-comment/idea-comment'
import { IdeaCommentMark } from './idea-comment-mark/idea-comment-mark'

import {FloatingDirective} from '../directives/floating'

@NgModule({
  imports:[
    CommonModule,
    PipeModule,
    IonicModule

     
  ],
  
  entryComponents: [
    IdeaModal,
     IdeaPriceAndBuy,
    IdeaWorkTime,
    IdeaComment,
    IdeaCommentMark
   
  ],
  declarations: [
    IdeaModal,
     IdeaPriceAndBuy,
    IdeaWorkTime,
    IdeaComment,
    IdeaCommentMark,
    FloatingDirective
   
  ],
  
  exports: [
   IdeaModal,
   IdeaWorkTime,
    IdeaPriceAndBuy,
    IdeaComment,
    IdeaCommentMark,
    FloatingDirective
  ],
 
})
export class SharedComponentsModule {}
