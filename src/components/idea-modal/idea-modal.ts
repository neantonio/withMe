import { Component,Input,Output,EventEmitter } from '@angular/core';

/**
 * Generated class for the IdeaModal component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'idea-modal',
  templateUrl: 'idea-modal.html'
})
export class IdeaModal {

  showValue=false;
  @Input()showLoading=false;
  @Output()showChange=new EventEmitter();

@Input()
  get show(){
    return this.showValue;
  }
  set show(value){
    console.log(value);
    this.showValue=value;
  }

  constructor() {
   
  }

  onBackGroundClick(){
    this.hide();
  }

  hide(){
    this.showValue=false;
    this.showChange.emit(this.showValue);
  }

}
