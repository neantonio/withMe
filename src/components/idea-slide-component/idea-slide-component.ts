import { Component,Input,Output,EventEmitter,ViewChild } from '@angular/core';
import{Slides,Events} from 'ionic-angular'

/**
 * Generated class for the IdeaSlideComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'idea-slide-component',
  templateUrl: 'idea-slide-component.html'
})
export class IdeaSlideComponent {

  @ViewChild(Slides) slides:Slides;

  @Input()slideItems=[];

  @Output()showenItemsChange=new EventEmitter();
  @Output()endIsNear=new EventEmitter();


  constructor(private ev: Events) {
   
  }

  onSlideChange(){
    let t=this.slideItems[this.slides.getActiveIndex()];
    if(typeof t !='undefined')
    this.ev.publish('slideContentChange',t);
  }

  slideTo(item){
    let index=this.slideItems.indexOf(item);
    if(index!=-1) this.slides.slideTo(index,400);
  }



}
