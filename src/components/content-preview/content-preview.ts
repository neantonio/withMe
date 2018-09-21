import { Component,Input,Output,EventEmitter,OnInit} from '@angular/core';
import {IContentPreview,ContentService} from '../../app/services/content.service';
import { Events } from 'ionic-angular'
/**
 * Generated class for the ContentPreviewComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'content-preview',
  templateUrl: 'content-preview.html'
})
export class ContentPreviewComponent implements OnInit{

  selected=false;
  categoryString;

  @Input()contentPreview:IContentPreview;
  @Input() sublightIfSelected=false;
    
        
  

  constructor(private ev: Events,private _contentDervice:ContentService) {
    this.ev.subscribe('contentClick', (data) => {
      this.resetClick(data);                           //все компоненты этого типа будут сбрасывать флаги selected
      });
  }

  ngOnInit(){
    this.categoryString=this._contentDervice.getCategoryString(this.contentPreview);
  }

  onClick(){
    if(this.selected) {
      
      this.selected=false;
      console.log('contentSecondClick',this.contentPreview);
      this.ev.publish('contentSecondClick',this.contentPreview);              //это не двойной клик, а просто второй подряд. например  первый центрирует карту, после второго переход на страницу объекта
    }
    else{
     console.log('contentClick',this.contentPreview);
      this.ev.publish('contentClick',this.contentPreview);
    }

  }
  resetClick(item){
    if(item!=this.contentPreview) this.selected=false;
  }

  

}
