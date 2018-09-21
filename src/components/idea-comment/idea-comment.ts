import { Component,Input,ViewChild } from '@angular/core';
import {IComment} from '../../app/services/content.service'

/**
 * Generated class for the IdeaComment component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'idea-comment',
  templateUrl: 'idea-comment.html'
})
export class IdeaComment {

  @Input()comment:IComment;

 
  
  constructor() {
   
  }

 

}
