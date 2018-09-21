import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { IdeaTimeParameter, TimeItem } from '../../components/idea-time-parameter/idea-time-parameter';
import { ISelectableItem } from '../../app/services/idea.service'
/**
 * Generated class for the TimeItemEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-time-item-edit-page',
  templateUrl: 'time-item-edit-page.html',
})
export class TimeItemEditPage {

  timeItem: TimeItem;
  newItemCreated = false;


  durationArrayPos = 2;
  durationArray = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    let data = navParams.get('data');
    this.durationArray = data[0].durationArray;
    if (data[0].item == null) {
      this.timeItem = new TimeItem(null);
      this.timeItem.parameter = { description: '', selected: false }
      this.newItemCreated = true;

    }

    else {
      this.timeItem = data[0].item;
      this.newItemCreated = false;
      this.findNearleastDuration();
    }




  }



  findNearleastDuration() {
    let i = 0;

    for (i = 0; i < this.durationArray.length; i++) {

      let current, next;
      current = this.durationArray[i].subcategory[0].description * 1;
      if (i == 0) {
        if (this.timeItem.minDuration <= current) {
          this.durationArrayPos = 0;
          return;
        }
      }
      if (i < this.durationArray.length - 1) {
        next = this.durationArray[i + 1].subcategory[0].description * 1;

        if ((this.timeItem.minDuration > current) && (this.timeItem.minDuration <= next)) {
          let toDown, toUp;
          toDown = this.timeItem.minDuration - current;
          toUp = next - this.timeItem.minDuration;
          if (toDown < toUp) this.durationArrayPos = i;
          else this.durationArrayPos = i + 1;
          return;
        }
      }
      else this.durationArrayPos = i;
    }
  }



  onCancel() {

    this.viewCtrl.dismiss();
  }
  onOk() {
    if ((this.timeItem.description == '') || (this.timeItem.description == null)) {     
      document.getElementById("description").classList.toggle('swing');
    }
    else {

      this.timeItem.minDuration = this.durationArray[this.durationArrayPos].subcategory[0].description;
      this.timeItem.updateParameter();
      console.log(this.timeItem, this.durationArrayPos);
      if (this.newItemCreated) {
        //this.timeItem.selectParameter();   выбирать буду снаружи
        this.viewCtrl.dismiss({ item: this.timeItem });
      }
      else this.viewCtrl.dismiss({ updateItem: true });
    }
  }
  onDelete() {
    this.viewCtrl.dismiss({ deleteItem: true });
  }

}
