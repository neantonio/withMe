import { Component,OnInit,NgZone,ViewChild } from '@angular/core';
import { NavController,Content,Events } from 'ionic-angular';
import {IdeaCreationPage} from '../idea-creation/idea-creation';
import {WalkDetailPage} from '../walk-detail/walk-detail';
import {MapTest} from '../map-test/map-test';
import {IdeaMap} from '../idea-map/idea-map';
import { TimeItemEditPage } from '../time-item-edit-page/time-item-edit-page';
import {IdeaDetailPage} from '../idea-detail/idea-detail';
import {ContentDetail} from '../content-detail/content-detail';
import {IdeaService,IDescribedItem} from '../../app/services/idea.service';
import {ContentService,IContentPreview} from '../../app/services/content.service';

import { IdeaProvider } from '../../providers/idea/idea';
import { ContentProvider } from '../../providers/content/content';
import {LanguageService} from '../../app/services/language.service';

import{ImageContainer} from'../../components/image-container/image-container'
import { ExternalApiService } from '../../app/services/external-api.service';
import { ImageLineCreator } from '../../app/services/view-decoration/image-line-creator';

import { Testing } from '../testing/testing';

var someService,someObject;

const images = [

  {
    image: "/image?id=404",
    important: false,
    width: 700,
    height: 366,
  },
  {
    image: "/image?id=415",
    important: true,
    width: 700,
    height: 406,
  }, {
    image: "/image?id=3324",
    important: false,
    width: 800,
    height: 600,
  }, {
    image: "/image?id=845",
    important: false,
    width: 700,
    height: 467,
  }, {
    image: "/image?id=1113",
    important: true,
    width: 700,
    height: 467,
  }
]

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  allSuggestions: IDescribedItem[];
  displaiedSuggestions: IDescribedItem[];
  suggestedIdeas: IDescribedItem[];
  suggestedWalks: IDescribedItem[];

  scrollPosition=0;
  anchors;

  testData=[];
   @ViewChild(Content) content: Content;
   @ViewChild(ImageContainer) imageContainer:ImageContainer;
  
  processScroll=true;
   onScroll(){
    if(this.processScroll){
     //this.disableProcessScroll()
     // setTimeout(()=>this.enableProcessScroll(),300);
     this.scrollPosition=this.content.getContentDimensions().scrollTop*1;
    
     this.ev.publish('pageScrolled',this.scrollPosition);
    }
   }

onAnchorChange(pos){
  this.disableProcessScroll()
  this.content.scrollTo(0,pos,800).then(()=>this.enableProcessScroll());
}


//сколько раз отключили, столько же на включить
scrollToggleValue=0;
enableProcessScroll(){
  this.scrollToggleValue--;
  if(this.scrollToggleValue==0) this.processScroll=true;
}
disableProcessScroll(){
  this.processScroll=false;
  this.scrollToggleValue++;
}


contents;
zone;

  constructor(public navCtrl: NavController,
              private _ideaService:IdeaService,
              private _contentService:ContentService,
              public provider:IdeaProvider,
              public contentProvider:ContentProvider,
              private _l:LanguageService,
              private ev:Events,
              private eapi:ExternalApiService) {
                someObject=this;
                someService=_contentService;
                this.imageLine=[this.getImageLine()];
    this.contents=[];
    this.anchors=[{name:'45',position:250},{name:'80',position:500},{name:'90',position:1300} ,{name:'190',position:2000}];
    console.log('origin',this.imageLine);
  }

  onCreateIdea(){
    this.navCtrl.push(IdeaCreationPage);

  }

  ngOnInit(){
   this._contentService.getSomeComment(null,null,null).then((data)=>{
     console.log('comments',data);
     this.comments=data;
    }
     ) ;
   // this.allSuggestions=this._ideaService.getSuggestions();
    // this.provider.doSomeHttp();
    //  this.contentProvider.doSomeHttp();
  //  this.selectIdeas();
   // this.zone = new NgZone({ enableLongStackTrace: false });
  }

  selectIdeas(){
      this.displaiedSuggestions=this.allSuggestions.filter(function(el){return el.type==='idea'});
     
  }
  selectWalks(){
       this.displaiedSuggestions=this.allSuggestions.filter(function(el){return el.type==='walk'});
  }

  onShowDetails(selectedItem:IDescribedItem){
   if(selectedItem.type=='walk')this.navCtrl.push(WalkDetailPage,{item: selectedItem});
    if(selectedItem.type=='idea')this.navCtrl.push(IdeaDetailPage,{item: selectedItem});
  }

  onShowContentDetail(selectedItem:IContentPreview){
    this.navCtrl.push(ContentDetail,{item: selectedItem});
  }

  getSomeData(arr){
    
   return someService.getSomeComment(null,null,null);
  }

   getSomeData2(arr){
     console.log('origin',this.imageLine);
    let result=[someObject.getImageLine()]
   return new Promise((resolve,reject)=>resolve(result));
  }

creator=new ImageLineCreator();
  getImageLine(){
   
   // this.creator.useImportantField = true;
     let root = this.creator.createRandomLineElement(images);
    root.computeSize();
   return root;
  }

  imageLine;
  


  onFunq(){
    this.navCtrl.push(Testing);
    // let i=0;
    // for(i=0;i<100;i++){
    //   this.testData.push('test'+i)
    // }
  
  }
  onFun2(){
     this.navCtrl.push(ContentDetail,null);
    //this.imageContainer.random();
  }
   onFun3(){
     this.navCtrl.push(ContentDetail,null);
    //this.imageContainer.random();
  }

  comments;

    
}
