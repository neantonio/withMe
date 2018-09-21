import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContentService, IContent, IContentPreview, IImages, IComments, IImage, IComment } from '../../app/services/content.service'
import { UserService } from '../../app/services/user.service'

/**
 * Generated class for the ContentDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var contentService;

@IonicPage()
@Component({
  selector: 'page-content-detail',
  templateUrl: 'content-detail.html',
})
export class ContentDetail {
  contentItem: IContent;
  contentPreviewItem: IContentPreview;
  comments: IComments = null;
  images: IImages = null;

 
  imagesWrapper;  //чтобы завернуть массив изображений одним элементом в другой массив
  minImagesInLine = 1;
  maxImagesInLine = 4;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private _contentService: ContentService,
              private _userService:UserService) {

    this.contentPreviewItem = this.navParams.get('item');

    contentService = _contentService;   //чтобы передать этот объект в колбэк для подгрузки при раскрытии списка

    _contentService.getFullContent(this.contentPreviewItem).then((data) => {
      let contentContainer;
      contentContainer = data;

      console.log('cont',contentContainer);
      this.contentItem = contentContainer.content;
      this.images = contentContainer.images;
      this.comments = contentContainer.comments;
    });

    this.imagesWrapper = [this.images];

    _userService.markAsWatched(this.contentPreviewItem);
  }

  ionViewDidLoad() {

  }

  getImagesForExpanding(arr) {
    let fun =  (resolve, reject)=> {
      console.log('this',this);
      
      let l;
      if(typeof arr=='undefined') l=0;else l=arr.length;
      if(typeof l=='undefined') l=0;

      this._contentService.getSomeData(this.contentItem.id, 100, 'image', l).then((data) => {
        let images = (<IImages>data).items;
        let result = [];
        console.log('data',data);
        //разбиваем резульат на более мелкие массивы случайным образом
        for (let i = 0; i < images.length;) {
          let value = Math.round(Math.random() * (this.maxImagesInLine - this.minImagesInLine)) + this.minImagesInLine;
          result.push(images.slice(i, i + value));
          i = i + value;
        }

        resolve(result);
      })
    }
  console.log('this',this);
    let fun2=fun.bind(this);
   
    return new Promise( fun.bind(this));

  }

  getCommentsForExpanding(arr) {
    let fun = function (resolve, reject) {
     contentService.getSomeData(this.contentItem.id, 100, 'comment', arr.length)
        .then((data) => {
          resolve((<IComments>data).items)
        })
    }
   
    return new Promise( fun.bind(this));
  }

}
