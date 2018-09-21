import { Component,Input,Output,EventEmitter } from '@angular/core';
import {IIdeaParameter,ISelectableItem} from '../../app/services/idea.service'
/**
 * Generated class for the ManyOfManyImages component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'many-of-many-images',
  templateUrl: 'many-of-many-images.html'
})
export class ManyOfManyImages {

   @Input()parameter:IIdeaParameter;
    @Output() parameterChanged=new EventEmitter()

  constructor() {
    
  }

 toggleItem(textItem:ISelectableItem){
   console.log(textItem);
      textItem.selected=!textItem.selected;
      this.parameterChanged.emit();
     
  }
}
