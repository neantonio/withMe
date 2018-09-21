import { Component,Input } from '@angular/core';

/**
 * Generated class for the IdeaCommentMark component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'idea-comment-mark',
  templateUrl: 'idea-comment-mark.html'
})
export class IdeaCommentMark {

  @Input()mark:number;
test;
  constructor() {
   
    
  }

}
