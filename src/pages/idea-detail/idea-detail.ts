import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {IDescribedItem} from '../../app/services/idea.service';
/**
 * Generated class for the IdeaDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-idea-detail',
  templateUrl: 'idea-detail.html',
})
export class IdeaDetailPage {

  ideaItem:IDescribedItem;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.ideaItem=this.navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IdeaDetailPage');
  }

}
