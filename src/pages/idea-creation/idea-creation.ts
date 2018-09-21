import { Component ,OnInit,Output,EventEmitter} from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import {IdeaService,IIdeaItem,IIdeaParameter} from '../../app/services/idea.service';

/**
 * Generated class for the MainPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

class IdeaMoveError{
  description:string;
  canMove=true;
  parameters=[]; 
}

@Component({
  selector: 'page-main',
  templateUrl: 'idea-creation.html',
})
export class IdeaCreationPage implements OnInit{

  ideaItems:IIdeaItem[];
  currentIdeaItem:IIdeaItem;
   ideaCompletedVar=false;
   ideaDirty=false;

    @Output() ideaCompleted= new EventEmitter();

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  private _ideaService:IdeaService,private toastCtrl: ToastController) {
    
  }

  ngOnInit(){
    this.ideaItems=this._ideaService.getIdeasList(); 
    this.currentIdeaItem=this._ideaService.getCurrentSelectedIdeaItem(); 
     console.log(this.currentIdeaItem);
  }

  getCurrentIdeaItem(){
    return this._ideaService.getCurrentSelectedIdeaItem();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  onSelectItem(item:IIdeaItem){
    this.currentIdeaItem=item;
     this._ideaService.selectIdea(item);
       if ( this._ideaService.tryMoveToNextLevel()) {
         this.ideaItems = this._ideaService.getIdeasList();
         console.log(this.ideaItems);
       }
       else {
         this.ideaCompletedVar=true;
         this.ideaCompleted.emit();
       }
  }

  onNextButton(){
    if(this.currentIdeaItem.childItems.length==1){
      this.currentIdeaItem=this.currentIdeaItem.childItems[0];

    }
  }
  onHandleMoveError(){
      let error=this.checkNextButtonActive();
       let toast = this.toastCtrl.create({
      message: error.description,                      //УЖНО ПЕРЕВЕСТИ 
      duration: 3000
    });
    toast.present();
  }

  onParameterChange(parameter:IIdeaParameter){
    console.log('parameter changed',parameter);
    
    parameter.dirty=true;
    this.currentIdeaItem.dirty=true;
    this.resolveParameterDependencies();
  }

//проверяем какой текст на кнопке далее или  пропустить
  checkSkipTextOnButton(){
    
    //если идею можно пропустить и ни один из параметров не обязателен к заполнению
    if(!this.currentIdeaItem.canBeIgnored) {
      console.log('canbeign');
      return false;
    }

    let i=0;
    for(i=0;i<this.currentIdeaItem.parameters.length;i++){
      if(this.currentIdeaItem.parameters[i].mustBeDirty) {
         console.log('mustbedirty');
        return false;
      }
    }

    //еще все параметры должны быть нетронутыми
    for(i=0;i<this.currentIdeaItem.parameters.length;i++){
      if(this.currentIdeaItem.parameters[i].dirty) {
         console.log('dirty');
        return false;
      }
    }

    return true;


  }

  //проверяем активность кнопки
  checkNextButtonActive(){
    console.log('idea',this.currentIdeaItem);
    let result= new IdeaMoveError();
    if(this.currentIdeaItem.allParametersMustBeDirty){
      let i;
      for(i=0;i<this.currentIdeaItem.parameters.length;i++){
        if(!this.currentIdeaItem.parameters[i].dirty) {
         result.canMove= false;
         result.parameters.push(this.currentIdeaItem.parameters[i]);
         result.description='fill all params'
        }
    }
    console.log(result);
    return result;
    
  }
  else{
    let i;
      for(i=0;i<this.currentIdeaItem.parameters.length;i++){
        if(this.currentIdeaItem.parameters[i].mustBeDirty ) if(! this.currentIdeaItem.parameters[i].dirty) {
           result.canMove= false;
         result.parameters.push(this.currentIdeaItem.parameters[i]);
         result.description='fill params'
        }
    }
  }
  return result;
  }

  resolveParameterDependencies(){
    let i=0;
    for(i=0;i<this.currentIdeaItem.parameters.length;i++){
        let parameter=this.currentIdeaItem.parameters[i];
        let dependsOnParameter=null;

        if(parameter.dependency!=null){

          //ищем сначала идею, потом нужный параметр
          let idea=this._ideaService.getIdeaByLevel(parameter.dependency.ideaLevel);
          if(idea!=null){
            let j=0;
            for(j=0;j<idea.parameters.length;j++){
              if(idea.parameters[j].id==parameter.dependency.dependsOn){
                dependsOnParameter=idea.parameters[j];
                break;
              }
            }
          }

          //если параметр найден, то производим манипуляции
          if(dependsOnParameter!=null){
            if(parameter.dependency.type=='available=selected'){
              let k=0;
              let selected=[];
              for(k=0;k<dependsOnParameter.availableStringValues.length;k++){
                if(dependsOnParameter.availableStringValues[k].selected){
                  selected.push(dependsOnParameter.availableStringValues[k]);
                }
              }
              parameter.availableStringValues=selected;
            }
              
          }

        }
    }
  }
  

}