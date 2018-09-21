import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContentDetail } from './content-detail';
import {IdeaPriceAndBuy} from '../../components/idea-price-and-buy/idea-price-and-buy'

@NgModule({
  declarations: [
    ContentDetail,
    IdeaPriceAndBuy
  ],
  imports: [
    IonicPageModule.forChild(ContentDetail),
  ],
  exports: [
    ContentDetail
  ]
})
export class ContentDetailModule {}
