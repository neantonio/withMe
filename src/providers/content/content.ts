import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ContentService,IContentPreview} from '../../app/services/content.service';
/*
  Generated class for the ContentProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ContentProvider {

  constructor(public http: Http,private _contentService:ContentService) {
    console.log('Hello ContentProvider Provider');
  }

  doSomeHttp(){
     let path = 'http://62.176.1.193:8080/content';
        let encodedPath = encodeURI(path);
        let timeoutMS = 10000;

 console.log('get content');
        this.http.get(encodedPath)
           
            .map(res => res.json()).subscribe(data => {
                let responseData = data;
                console.log(responseData);
                this._contentService.setContent(responseData);
            },
            err => {
                console.log('error in ETPhoneHome');
            });
  }

}
