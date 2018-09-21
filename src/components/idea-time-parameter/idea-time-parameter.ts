import { Component, Input, ViewChild, ChangeDetectorRef,Output,EventEmitter } from '@angular/core';
import { IIdeaParameter, ISelectableItem } from '../../app/services/idea.service'
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { AlertController, ModalController } from 'ionic-angular';
import { TimeItemEditPage } from '../../pages/time-item-edit-page/time-item-edit-page';
import { NavController } from 'ionic-angular';
/**
 * Generated class for the IdeaTimeParameter component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
export class TimeItem {
  minBegin: number;
  minDuration: number;
  minAccuracy: number;
  description: string;
  parameter: ISelectableItem;
  date: any;

  constructor(param: ISelectableItem) {
    if (param != null) {
      this.parameter = param;
      let text = param.description;
      let endOFText = text.indexOf('\t');
      this.description = text.substring(0, endOFText);
      this.minBegin = parseInt(text.substring(endOFText + 1, endOFText + 5));
      this.minDuration = parseInt(text.substring(endOFText + 5, endOFText + 9));
      this.minAccuracy = parseInt(text.substring(endOFText + 9, endOFText + 13));
      this.calcDateString();
    }
    else {
      let date = new Date();
      this.minBegin = date.getHours() * 60 + date.getMinutes();
      this.minDuration = 30;
      this.minAccuracy = 0;
      this.calcDateString();
    }
  }

  

  updateParameter() {
    this.calkMinBegin();
    this.parameter.description = this.calcSelectableItemString();
    
  }
  selectParameter() {
    this.parameter.selected = true;
  }

  calcDateString() {
    let h, m, hour, min;
    min = (this.minBegin - (Math.floor(this.minBegin / 60)) * 60);
    hour = Math.floor(this.minBegin / 60)
    if (hour < 10) {
      h = '0' + hour;
    }
    else {
      h = '' + hour;
    }
    if (min < 10) {
      m = '0' + min;
    }
    else {
      m = '' + min;
    }
    this.date = h + ':' + m;

  }
  calkMinBegin(){
    let hour,min;
    hour=this.date.substr(0,2);
    min=this.date.substr(3,5);
    
    this.minBegin=0+hour*60+min*1;
    console.log(min,hour,this.date,this.minBegin);
  }
  calcSelectableItemString() {
    let result;
    let temp = '000000000000';
    result = this.description + '/t';
    temp=this.stringCross(temp, this.minBegin, 3);
    console.log(temp);
    temp=this.stringCross(temp, this.minDuration, 7);
    console.log(temp);
    temp=this.stringCross(temp, this.minAccuracy, 11);
    console.log(temp);
    return result+temp;
  }

  stringCross(source, pattern, pos) {
    let i = 0;
    let temp=''+pattern;

    for (i = 0; i < temp.length; i++) {
      source=source.substr(0, pos) +temp[temp.length - 1 - i]+ source.substr(pos+1);
      console.log(source);
      pos--;
    }
    return source;
  }

}

@Component({
  selector: 'idea-time-parameter',
  templateUrl: 'idea-time-parameter.html'
})
export class IdeaTimeParameter {

  @Input() parameter: IIdeaParameter;
  @Output() parameterChanged=new EventEmitter()
  inverceColor = false;
  noSelected = true;

  hourFormat = 12;

  begin = 0; end = 180;

  timeItems = null;
  selectedTimeItem;
  constructor(private _sanitizer: DomSanitizer, public modalCtrl: ModalController, private cdr: ChangeDetectorRef) { }

  ngOnInit() {

    this.cdr.detectChanges();
    this.makeTimeItems();
  }

  makeTimeItems() {
    this.timeItems=[]

    this.timeItems = [];
    let i = 0;
    for (i = 0; i < this.parameter.availableStringValues.length; i++) {
      this.timeItems.push(new TimeItem(this.parameter.availableStringValues[i]))
    }
    
  }

  toggleItem(timeItem) {
    this.noSelected = false;
    if (this.selectedTimeItem != null) {
      this.selectedTimeItem.parameter.selected = false;
      timeItem.parameter.selected = true;

    }
    this.selectedTimeItem = timeItem;
    this.calculateRotatePositions();
  }


  getRotate1() {
    //this.calculateRotatePositions();
    if (this.begin == null) return '';
    return this._sanitizer.bypassSecurityTrustStyle(' transform: rotate(' + this.begin + 'deg);');
  }
  getRotate2() {
    //this.calculateRotatePositions();
    if (this.end == null) return '';
    return this._sanitizer.bypassSecurityTrustStyle(' transform: rotate(' + this.end + 'deg);');
  }

  calculateRotatePositions() {

    if (this.selectedTimeItem == null) return '';

    let beginWithHourFormat;
    if (this.selectedTimeItem.minBegin > this.hourFormat * 60) {
      beginWithHourFormat = this.selectedTimeItem.minBegin - this.hourFormat * 60;
      console.log('greater 12', beginWithHourFormat);
    }
    else {

      beginWithHourFormat = this.selectedTimeItem.minBegin;
      console.log('smaller 12', beginWithHourFormat);
    }

    this.begin = beginWithHourFormat / (this.hourFormat * 60) * 360 - 90;
    this.end = this.begin + (this.selectedTimeItem.minDuration) / (this.hourFormat * 60) * 360 + 180;

    console.log(this.begin, this.end, this.selectedTimeItem.minDuration);
    if (this.selectedTimeItem.minDuration > this.hourFormat / 2 * 60) {
      this.inverceColor = true;
      this.cdr.markForCheck();

      this.end -= 180;
      this.begin += 180;
    }
    else this.inverceColor = false;

    console.log(this.begin, this.end);

  }

  addTimeItem() {
    
    let profileModal = this.modalCtrl.create(TimeItemEditPage, { data: [{ durationArray: this.parameter.helperData }] });
    profileModal.onDidDismiss(data => {
        if (typeof data != 'undefined') {
          if(data.item){
            console.log(data.item);
            this.parameter.availableStringValues.push(data.item);
            this.timeItems.push(data.item);
            this.toggleItem(data.item);
            this.parameterChanged.emit();
            this.calculateRotatePositions();
          }
        }
    });
    profileModal.present();

  }

  editTimeItem(timeItem) {
    if (this.selectedTimeItem != null) {
      
      let profileModal = this.modalCtrl.create(TimeItemEditPage, { data: [{ item: timeItem, durationArray: this.parameter.helperData }] });
      profileModal.onDidDismiss(data => {
        if (typeof data != 'undefined') {
          if (data.deleteItem) {

            this.deleteTimeItem(this.selectedTimeItem);
          }
          if(data.updateItem){
         
            this.cdr.detectChanges();
          }
          this.parameterChanged.emit();
           this.calculateRotatePositions();
        }
      });
      profileModal.present();
    }
  }

  deleteTimeItem(timeItem: TimeItem) {
    let i = 0;
    
    this.parameter.availableStringValues.splice(this.parameter.availableStringValues.indexOf(timeItem.parameter), 1);
    
    this.makeTimeItems();
    this.selectedTimeItem=null;
     this.begin = 0; this.end = 180;  //сбрасываю угловые позиции циферблата
     this.noSelected=true;
  }

}
