import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import {MapJs} from '../../components/map-js/map-js'
import {IdeaSlideComponent} from '../../components/idea-slide-component/idea-slide-component'
// import {IContentPreview} from'../../app/services/content.service'
/**
 * Generated class for the IdeaMap page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

const testContent=[{
  title:'title',
  shortDescription:'description description description description',
  lat:55,
  lng:37.5,
  id:'11',
  image:'http://localhost:8080/image?id=1113 ',
  category:{indexes:[1,2]}
},
{
  title:'title2',
  shortDescription:'description2 description2 description2 description2',
  lat:55.5,
  lng:37.5,
  id:'12',
  image:'http://localhost:8080/image?id=404 ',
  category:{indexes:[1,2]}
},
{
  title:'title3',
  shortDescription:'description2 description2 description2 description2',
  lat:55.2,
  lng:37.2,
  id:'12',
  image:'http://localhost:8080/image?id=415 ',
  category:{indexes:[1,2]}
}
  ]


@IonicPage()
@Component({
  selector: 'page-idea-map',
  templateUrl: 'idea-map.html',
})
export class IdeaMap {

  @ViewChild(MapJs) map:MapJs;
  @ViewChild(IdeaSlideComponent) slide:IdeaSlideComponent;
  content;

  constructor(public navCtrl: NavController, public navParams: NavParams,private ev:Events) {
    ev.subscribe('contentClick',(data)=>{
      console.log('try to center',data);
      this.map.centerOnMarker(data);
    } );
    ev.subscribe('contentSecondClick',(data)=>{return;} );
    ev.subscribe('slideContentChange',(data)=>{
      console.log('try to sublight',data);
      this.map.sublightMarker(data);
    } );
    this.content=testContent;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IdeaMap',this.map);
  }

  onMapMarkerClick(event){
      this.slide.slideTo(event);
  }

}
