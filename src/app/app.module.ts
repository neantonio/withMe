import { BrowserModule } from '@angular/platform-browser';
import {IonicStorageModule} from '@ionic/storage'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule, NgZone,NO_ERRORS_SCHEMA } from '@angular/core';
import { GoogleMaps } from '@ionic-native/google-maps';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IdeaService } from './services/idea.service';
import { SystemService } from './services/system.service';

import { ViewDecorationService } from './services/view-decoration.service';
import { LanguageService } from './services/language.service';
import { ContentService } from './services/content.service';
import { MathService } from './services/math.service';
import { AlertController, ModalController, ViewController } from 'ionic-angular';
import { IdeaParameter } from '../components/idea-parameter/idea-parameter';
import { IdeaTimeParameter } from '../components/idea-time-parameter/idea-time-parameter';
import { ManyOfManyImages } from '../components/many-of-many-images/many-of-many-images';
import { IdeaSliderParameter } from '../components/idea-slider-parameter/idea-slider-parameter';
import { ScrollController } from '../components/scroll-controller/scroll-controller';
import { MapJs } from '../components/map-js/map-js';
import { IdeaSlideComponent } from '../components/idea-slide-component/idea-slide-component';
import { IdeaDistance } from '../components/idea-distance/idea-distance';
import { IdeaPriceAndBuy } from '../components/idea-price-and-buy/idea-price-and-buy';



import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TimeItemEditPage } from '../pages/time-item-edit-page/time-item-edit-page';
import { IdeaCreationPage } from '../pages/idea-creation/idea-creation';
import { WalkDetailPage } from '../pages/walk-detail/walk-detail';
import { ContentDetail } from '../pages/content-detail/content-detail';
import { IdeaDetailPage } from '../pages/idea-detail/idea-detail';
import { IdeaMap } from '../pages/idea-map/idea-map';
import { MapTest } from '../pages/map-test/map-test';
import { IdeaProvider } from '../providers/idea/idea';
import { MapInfoService } from './services/map-info.service';
import { UserService } from './services/user.service';
import { ExternalApiService } from './services/external-api.service';

import { HttpModule } from '@angular/http';
import { ContentPreviewComponent } from '../components/content-preview/content-preview';
import { IdeaExpandableList } from '../components/idea-expandable-list/idea-expandable-list';

import { ImageContainer } from '../components/image-container/image-container';
import { CategorySearch } from '../components/category-search/category-search';
import { ImageContainerElement } from '../components/image-container-element/image-container-element';
import { ContentProvider } from '../providers/content/content';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { Geolocation } from '@ionic-native/geolocation';

import { PipeModule } from '../pipes/pipe.module'
import { OnlineDirective } from '../directives/online'


import { TestingModule } from '../pages/testing/testing.module';
import {SharedComponentsModule} from '../components/shared-components.module';

@NgModule({
   schemas:      [ NO_ERRORS_SCHEMA ],
  declarations: [
    MyApp,
    HomePage,
    IdeaCreationPage,
    WalkDetailPage,
    IdeaDetailPage,
    TimeItemEditPage,
    IdeaParameter,
    ContentPreviewComponent,
    ImageContainer,
    ImageContainerElement,
    MapTest,
    IdeaTimeParameter,
    CategorySearch,
    ManyOfManyImages,
    IdeaSliderParameter,
    ScrollController,
    MapJs,
    IdeaMap,
    IdeaSlideComponent,
    IdeaDistance,
    
   // IdeaModal,
   // Translate,
    OnlineDirective,
    IdeaExpandableList,
    
    ContentDetail
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
   // SharedModule,
   SharedComponentsModule,
   PipeModule,
    BrowserAnimationsModule,
  TestingModule,
    IonicImageViewerModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      menuType: 'push',
      platforms: {
        ios: {
          menuType: 'overlay',
        }
      }

    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    IdeaCreationPage,
    WalkDetailPage,
    IdeaDetailPage,
    TimeItemEditPage,
    MapTest,
    IdeaMap,
    ContentDetail,
  ],
  providers: [
    StatusBar,
    SystemService,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    IdeaService,
    ContentService,
    IdeaProvider,
    ContentProvider,
    MathService,
    LanguageService,
    AlertController,
    ModalController,
    Geolocation,
    ViewDecorationService,
    GoogleMaps,
    MapInfoService,
    UserService,
    ExternalApiService
    
  ],
  exports:[
    
  ]
})
export class AppModule { }
