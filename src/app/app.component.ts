import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IdeaProvider } from '../providers/idea/idea';

import { HomePage } from '../pages/home/home';

import { MapInfoService } from './services/map-info.service';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,ideaProvider:IdeaProvider,private _m:MapInfoService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
     
      statusBar.styleDefault();
      splashScreen.hide();
       ideaProvider.getInitJSON();
    });
  }
}

