import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {IdeaService,IDescribedItem} from '../../app/services/idea.service';
import {LanguageService} from '../../app/services/language.service';
/*
  Generated class for the IdeaProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class IdeaProvider {

  constructor(public http: Http,private _ideaService:IdeaService, private _languageService: LanguageService) {
    console.log('Hello IdeaProvider Provider');
  }

  doSomeHttp(){
     let path = 'http://62.176.1.193:8080/idea';
        let encodedPath = encodeURI(path);
        let timeoutMS = 10000;

        this.http.get(encodedPath)
           
            .map(res => res.json()).subscribe(data => {
                let responseData = data;
                console.log(responseData);
                this._ideaService.setIdea(responseData);
            },
            err => {
                console.log('error in ETPhoneHome');
            });
  }

  getInitJSON(){
    let path = 'http://62.176.1.193:8080/idea?init=true';
        let encodedPath = encodeURI(path);
        let timeoutMS = 10000;

        this.http.get(encodedPath)
           
            .map(res => res.json()).subscribe(data => {
                let responseData = data;
                console.log(responseData);
                this._ideaService.setIdea(responseData.ideaCreationTools);
                this._languageService.setWordMap(responseData.wordMap);
            },
            err => {
                console.log('error getting init json');
            });
  }

}
