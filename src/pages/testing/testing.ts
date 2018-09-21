import { Component, ViewContainerRef, ViewChildren, ReflectiveInjector, ComponentFactoryResolver,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage'

import { IdeaWorkTime } from '../../components/idea-work-time/idea-work-time'
import { IdeaWorkTimeTest } from '../../app/services/tests/idea-work-time.test'
import { IdeaPriceAndBuy } from '../../components/idea-price-and-buy/idea-price-and-buy'
import { IdeaPriceAndBuyTest } from '../../app/services/tests/idea-price-and-buy.test'
import { IdeaComment } from '../../components/idea-comment/idea-comment'
import { IdeaCommentTest } from '../../app/services/tests/idea-comment.test'

import { DomSanitizer } from '@angular/platform-browser';

import * as html2canvas from 'html2canvas';
/**
 * Generated class for the Testing page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

interface IComponentData{
  version:string;
  bug:boolean;
  remark:string;
  data:any;
}

@IonicPage()
@Component({
  selector: 'page-testing',
  templateUrl: 'testing.html',
  entryComponents: [IdeaWorkTime]
})
export class Testing {

  availableComponents = [];
  testData = [];
  currentComponents = [];           //содержатся сущности тестирумых компонентов
  showComponentList = true;
  currentTestingData;
  savedComponentData:IComponentData[];
  selectedComponent=null;
  showSaveDataDialog=false;

  savedData;
  savedDataInCurentSession=[];
  markedAsBugDataInCurrnetSession=[];
  canRemoveSavedData=false;
  currentSavingData={
    version:null,
    bug:false,
    remark:'',
    data:null
  }

  @ViewChildren('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer;
  

  constructor(private resolver: ComponentFactoryResolver, private _sanitizer: DomSanitizer,private _storage:Storage) {
    this.availableComponents.push({ component: IdeaWorkTime, test: IdeaWorkTimeTest, testValue: 100 });
     this.availableComponents.push({ component: IdeaPriceAndBuy, test:IdeaPriceAndBuyTest, testValue: 100 });
     this.availableComponents.push({ component: IdeaComment, test:IdeaCommentTest, testValue: 100 });
  }

  selectComponentToTest(component) {
    this.selectedComponent=component;

    let testInstance = new component.test();
     this.testData = [];
    for (let i = 0; i < component.testValue; i++) {
      this.testData.push(testInstance.getData());
    }
    this.currentComponents.fill('', 0, component.testValue);

    this.getSavedComponentData(component).then((data)=>{
      this.savedData=data;
    })

    setTimeout(() => {
      this.showComponentList = false;
      console.log(this.testData, this.dynamicComponentContainer._results.length);
     
      this.dynamicComponentContainer._results.forEach((item, i, arr) => {
        
        this.setComponentData(item, i, { component: component.component, inputs:this.testData[i] })
      })
    }, 300)


  }

  saveTestData(data,bug,remark){
    let componentData={
      version: this.selectedComponent.version,

    }
  }

  // component: Class for the component you want to create
  // inputs: An object with key/value pairs mapped to input name/input value
  setComponentData(componentContainer: ViewContainerRef, index: number, data: { component: any, inputs: any }) {
    if (!data) {
      return;
    }
   
    // Inputs need to be in the following format to be resolved properly
    let inputProviders = Object.keys(data.inputs).map((inputName) => { return { provide: inputName, useValue: data.inputs[inputName] }; });
    let resolvedInputs = ReflectiveInjector.resolve(inputProviders);

    // We create an injector out of the data we want to pass down and this components injector
    let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicComponentContainer.parentInjector);

    // We create a factory out of the component we want to create
    let factory = this.resolver.resolveComponentFactory(data.component);

    // We create the component using the factory and the injector
    let component = factory.create(injector); 
    
    Object.keys(data.inputs).map((inputName) => { component.instance[inputName]= data.inputs[inputName] ;});
    if( typeof(component.instance['ngOnInit'])!= 'undefined')  (<OnInit>component.instance).ngOnInit();
   
console.log('compo',component);
    // We insert the component into the dom container
    componentContainer.insert(component.hostView);

    // Destroy the previously created component

    if (this.currentComponents[index]) {
      this.currentComponents[index].destroy();
    }

    this.currentComponents[index] = component;
  }

showCurrentDataJSON=false;
  showJSON(data){
    console.log(data);
    this.currentTestingData=data;
    this.showCurrentDataJSON=true;
  }

  onSave(data){
    this.showSaveDataDialog=true;
  }
  onRemove(data){
    this.currentSavingData=data;
    this.removeSavedComponentData(this.selectedComponent,data);
  }
  onEdit(data){
    this.currentSavingData=data;
    this.canRemoveSavedData=true;
    this.showSaveDataDialog=true;
  }
  onSaveDataDialogOk(){
     this.showSaveDataDialog=false;
  }
  onSaveDataDialogCancel(){
    this.showSaveDataDialog=false;
  }

  getSavedComponentData(component):Promise<any>{
    return this._storage.get(component);
  }
  removeSavedComponentData(component,data){
    this.getSavedComponentData(component).then((componentData)=>{
      if(Array.isArray(componentData)){
        let index=componentData.indexOf(data);
        if(index!=-1){
          componentData.splice(index,1);

          let tempIndex=this.savedDataInCurentSession.indexOf(data);
          if(tempIndex!=-1)this.savedDataInCurentSession.splice(tempIndex,1);
          this.setSavedComponentData(component,componentData);
        }
      }
    })
  }
  addSavedComponentData(component,data){
    this.getSavedComponentData(component).then((componentData)=>{
      if(!Array.isArray(componentData)){
       componentData=[];
      }
       componentData.push(data);
      this.setSavedComponentData(component,componentData);
      this.savedDataInCurentSession.push(data);
    })
  }
  setSavedComponentData(component,data){
    return this._storage.set(component,data);
  }

  toCanvas(componentData){
    let index=this.testData.indexOf(componentData);
    if(index==-1)return;
    let item=this.currentComponents[index]._viewRef._viewContainerRef.element.nativeElement.parentNode.parentNode.parentNode.parentNode;
    let itemSliding=this.currentComponents[index]._viewRef._viewContainerRef.element.nativeElement.parentNode.parentNode.parentNode.parentNode.parentNode;

    item.removeAttribute("style");
    
    itemSliding.classList.remove("active-slide");
    itemSliding.classList.remove("active-options-right");

    console.log(this.currentComponents[index]._viewRef._viewContainerRef.element.nativeElement.parentNode.parentNode.parentNode.parentNode);
     console.log(this.currentComponents[index]);
     console.log(this);
//     html2canvas(this.currentComponents[index]._viewRef._viewContainerRef.element.nativeElement.nextSibling.firstElementChild).then((canvas)=> {
//       this.currentComponents[index]._viewRef._viewContainerRef.element.nativeElement.appendChild(canvas);
   
// })

html2canvas(this.currentComponents[index]._viewRef._viewContainerRef.element.nativeElement.nextSibling, {
    width: 360,
    height: 50,
    onrendered: (canvas)=> {

      this.currentComponents[index]._viewRef._viewContainerRef.element.nativeElement.appendChild(canvas);

    }

});


  }




}
