import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SystemService{

    isOnline;
    isConnectedToServer;

    constructor(){
        this.isOnline = Observable.merge(
      Observable.of(navigator.onLine),
      Observable.fromEvent(window, 'online').map(() => true),
      Observable.fromEvent(window, 'offline').map(() => false));
    }

    runOnDevice():boolean{
        return !document.URL.startsWith('http');
    }

    openExternalURL(url:string){
        if(this.runOnDevice()){
            window.open(url, '_blank', 'location=no');
        }
        else{
            window.open(url, '_system');
        }
    }
}