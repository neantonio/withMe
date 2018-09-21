import { Component,Input,Output ,EventEmitter,ViewChild} from '@angular/core';
import {IIdeaParameter,ISelectableItem} from '../../app/services/idea.service'
import { AlertController } from 'ionic-angular';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
/**
 * Generated class for the WalkDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'app-idea-parameter',
  templateUrl: 'idea-parameter.html',
})
export class IdeaParameter{

    @Input()parameter:IIdeaParameter;
    @Output() parameterChanged=new EventEmitter()
     @ViewChild('scroll') scroll: any;
     @ViewChild('content') content: any;

  constructor(public alertCtrl: AlertController,private _sanitizer: DomSanitizer) {
    let rt=null;
  }

  toggleItem(textItem:ISelectableItem){
      textItem.selected=!textItem.selected;
      
      this.parameterChanged.emit();
      if(textItem.selected)this.scrollToElement(textItem.description.length);
  }

  getSelectedParametersWithSubcategories(item){
    let i=0;
    
    let result=[];
    for(i=0;i<item.subcategory.length;i++){
      if(item.subcategory[i].selected){
        if(item.subcategory[i].subcategory!=null){
            result.push(item.subcategory[i]);
        }
      }
    }
    return result;
  }

  addSubItem(item){

    let prompt = this.alertCtrl.create({
      title: 'Новая категория',
      message: "",
      inputs: [
        {
          name: 'title',
          placeholder: ''
        },
      ],
      buttons: [
        {
          text: 'Отмена',
          handler: data => {
            console.log(data);
          }
        },
        {
          text: 'Ок',
          handler: data => {
            item.subcategory.push({description: data.title,selected:true});
          }
        }
      ]
    });
    prompt.present();
  }

  getScrollHeight(){
     var el = document.getElementsByClassName('scroll-item');
     
     let i=0,max=0;
     if(el!=null){
       
       for(i=0;i<el.length;i++){
          let rect = el[i].getBoundingClientRect();
          if(rect.height>max) max=rect.height;
       }
       
     }
    
      return this._sanitizer.bypassSecurityTrustStyle('height:' +Math.round(max)+'px'); 
  }

  scrollToElement(id) { 
    // console.log(id);
    // var el = document.getElementsByClassName('scroll-item');
    // if(el!=null){var rect = el.getBoundingClientRect();
    //   console.log(el,rect);
    // // scrollLeft as 0px, scrollTop as "topBound"px, move in 800 milliseconds
    // this.scroll.scrollTo(100, 0, 400);
    // }
}
  }
 


