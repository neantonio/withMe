import { Component,Input,Output,EventEmitter } from '@angular/core';
import {IIdeaParameter,ISelectableItem} from '../../app/services/idea.service'
/**
 * Generated class for the IdeaSliderParameter component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'idea-slider-parameter',
  templateUrl: 'idea-slider-parameter.html'
})
export class IdeaSliderParameter {

 index=0;
   @Input()valuesToShow=[];
   
     @Input()description:string;
      @Output() numberValueChange :  EventEmitter<number>;

  constructor() {
    this.numberValueChange = new EventEmitter();
   
  }

@Input()
get numberValue(){
  return this.index;
}
set numberValue(value){
  this.index=value;
}

onChange(){
  console.log('emit',this.numberValue);
  this.numberValueChange.emit(this.numberValue);
}
}
