
import { Component, NgZone, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ViewDecorationService } from '../../app/services/view-decoration.service';
import { IMapMarker,GeoPoint,GeoBound } from '../../app/services/map-info.service';

declare var google;

interface IMapComponent {

}



@Component({
  selector: 'gmap-js',
  templateUrl: 'map-js.html'
})
export class MapJs implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  selectedMarkers = [];
  selectedMarker = null;
  addedMarker = null;
  addedMarkers = [];

  sublightedMarker=null;

//параметры для инициализации
  @Input() markers;
  @Input() center: GeoPoint;
  @Input() initBounds: GeoBound;
  @Input() initZoom: number;

//параметры для работы с маркерами
  @Input() draggableMarkers = false;
  @Input() centerMapOnClick = false;
  @Input() selectSeveralMarkesrOnClick = false;         //мультиселект и мультипут перебивает одиночный селект
  @Input() selectOneMarkerOnClick = false;
  @Input() putOneMarkerOnClick = false;
  @Input() putSeveralMarkersOnClick = false;
  @Input() dragMarkers = false;
  @Input() deleteAddedOnDbclick=false;

  @Output() markerClick = new EventEmitter();
  @Output() boundsChange = new EventEmitter();

  private _v: ViewDecorationService = new ViewDecorationService();


  constructor(public navCtrl: NavController, public geolocation: Geolocation) {

  }

  ngOnInit() {

    if (this.initZoom == null) this.initZoom = 15;
    if ((this.markers == null) && (this.center == null) && (this.initBounds == null)) {
      this.geolocation.getCurrentPosition().then((position) => { this.loadMap(new GeoPoint(position.coords.latitude, position.coords.longitude)) });
    }
    else {
      if (this.initZoom == null) this.initZoom = 15;
      //в приоритете маркеры, потом границы, потом центр 
      if (this.markers == null) {
        if (this.initBounds == null) {
          //центр нулю рабен не будет из-за ифа выше
          this.loadMap(this.center);
        }
        else {
          this.loadMap(this.center);
          this.map.fitBounds(this.initBounds.getGoogleBounds());
        }
      }
      else {
        //если маркер один, то карта центрируется по нему, сли массив, то определяются общие грацины+10%
        if (Array.isArray(this.markers)) {

          let bounds = this.calcBoundsByMarkers(this.markers);
          let center = bounds.getGoogleBounds().getCenter();


          this.loadMap(new GeoPoint(center.lat(), center.lng()));

          this.map.fitBounds(bounds.getGoogleBounds());
          this.setMarkers(this.markers);
        }
        else {

          //дальше все равно будем работать с массивом
          let marker = this.markers;
          this.markers = [];
          this.markers.push(marker);

          this.loadMap(new GeoPoint(marker.lat, marker.lng));
        }
      }
    }

  }

 private loadMap(position: GeoPoint) {

    let latLng = position.getGoogleLatLng();
    console.log('load start', latLng);

    let mapOptions = {
      center: latLng,
      zoom: this.initZoom,
      noClear: true,
      streetViewControl: false,
      fullscreenControl:false,
      scaleControl: false,
      zoomControl: false,
      mapTypeControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.map.addListener( 'click', (event)=>
      this.onMapClick(event.latLng)
    );
  }

 private toggleSeveralMarker(marker, gmarker) {
    console.log('several');
    if (this.selectedMarkers.indexOf(marker) == -1) {
      this.selectedMarkers.push(marker);
      gmarker.setIcon(this._v.getSelectedIcon(marker.type));
    }
    else {
      this.selectedMarkers.splice(this.selectedMarkers.indexOf(marker), 1);
      gmarker.setIcon(this._v.getIcon(marker.type));
    }
  }
  private toggleOneMarker(marker, gmarker) {
    console.log('one');
    if (marker != this.selectedMarker) {
      if (this.selectedMarker != null) {
        let g = this.selectedMarker.data.googleMarker;
        if (typeof g != 'undefined') g.setIcon(this._v.getIcon(marker.type));
      }

    }
    else {
      gmarker.setIcon(this._v.getIcon(marker.type));
      this.selectedMarker = null;
      return;
    }
    gmarker.setIcon(this._v.getSelectedIcon(marker.type));
    this.selectedMarker = marker;
  }
  private createMarker(latLng, addSeveral, deleteOnDbClick) {
    
     let marker: IMapMarker = { lat: latLng.lat(), lng: latLng.lng(), id:'' };
      this.addMarker(marker);
    if (addSeveral) {   
     
      this.addedMarkers.push(marker);
     
    }
    else{
      //удаляем ранее добавленный
      if(this.addedMarker!=null) this.deleteMarker(this.addedMarker);
      this.addedMarker=marker;
      
    }
     if(deleteOnDbClick) {
       console.log('deleteadded');
        marker.data.googleMarker.addListener('dbclick', () => {
          console.log('delete',marker);
          this.deleteMarker(marker);
        });
      }
  }

  private deleteMarker(marker){
    if(this.markers.indexOf(marker)!=-1) this.markers[this.markers.indexOf(marker)]=null;// this.markers.splice(this.markers.indexOf(marker),1);
    if(this.addedMarkers.indexOf(marker)!=-1) this.addedMarkers.splice(this.addedMarker.indexOf(marker),1);
    let g=marker.data.googleMarker;
    if(typeof g !='undefined') g.setMap(null);
  }



  private calcBoundsByMarkers(markers) {
    let n = -200, s = 200, w = 200, e = -200
    for (let i = 0; i < markers.length; i++) {
      if (markers[i].lat > n) n = markers[i].lat;
      if (markers[i].lat < s) s = markers[i].lat;
      if (markers[i].lng > e) e = markers[i].lng;
      if (markers[i].lng < w) w = markers[i].lng;
    }
    return new GeoBound(new GeoPoint(s, w), new GeoPoint(n, e));
  }

  centerOnMarker(marker) {
    let gpoint = new GeoPoint(marker.lat, marker.lng);
    this.map.setCenter(gpoint.getGoogleLatLng());
  }

  sublightMarker(marker){
   
    let g=marker.data;
    if(typeof g =='undefined'){
      console.log('marker with ud data',marker);
      return;
    }
    else g=marker.data.googleMarker;
    if(typeof g =='undefined'){
      console.log('marker with ud gmarker',marker);
      return;
    }

//отменяем подсветку предыдущего и подсвечиваем новый
    if(this.sublightedMarker!=null){
      let prevg=this.sublightedMarker.data.googleMarker;

      if((this.selectedMarker==this.sublightedMarker)||(this.selectedMarkers.indexOf(this.sublightedMarker)!=-1)) prevg.setIcon(this._v.getSelectedIcon(this.sublightedMarker.icon));
      else prevg.setIcon(this._v.getIcon(this.sublightedMarker.icon));

     
    }

     this.sublightedMarker=marker;
      g.setIcon(this._v.getSublightedIcon(this.sublightedMarker.icon));
    

  }

  setMarkers(markers) {
    this.addMarkers(markers);
  }

  addMarkers(markers) {
    console.log(markers);
    markers.forEach((marker, i, markers) => this.addMarker(marker));

  }
  addMarker(marker) {

    if (this.markers.indexOf(marker) == -1) {
      this.markers.push(marker);

    }

    marker.index = this.markers.indexOf(marker);

    let temp= marker.data;
    if (typeof temp!= 'undefined'){
      temp=marker.data.googleMarker;
    }
console.log('temp',temp);
    //чтобы не добавлять дважды одинаковые
    if (typeof temp== 'undefined') {
      let googleMarker = new google.maps.Marker({
        map: this.map,
        draggable: this.dragMarkers,
        icon: this._v.getIcon(marker.type),
        position: new google.maps.LatLng(marker.lat, marker.lng),
        place: { location: new google.maps.LatLng(marker.lat, marker.lng), placeId: marker.index.toString() }
      });
      console.log(googleMarker,marker);

      googleMarker.addListener('click', () => {

        this.onMarkerClick(googleMarker.getPlace().placeId, googleMarker)
        console.log(this.markers[googleMarker.getPlace().placeId]);
      });
      this.setMarkerData(marker, 'googleMarker', googleMarker);
    }

  }

  private onMarkerClick(markerIndex: number, gmarker) {
    this.markerClick.emit(this.markers[markerIndex]);
    if (this.centerMapOnClick) this.map.setCenter(gmarker.getPosition());
    if (this.selectSeveralMarkesrOnClick) this.toggleSeveralMarker(this.markers[markerIndex], gmarker);
    else if (this.selectOneMarkerOnClick) this.toggleOneMarker(this.markers[markerIndex], gmarker);

  }
  private onMapClick(latLng) {
    console.log('click');
    if((this.putOneMarkerOnClick)||(this.putSeveralMarkersOnClick)) this.createMarker(latLng,this.putSeveralMarkersOnClick,this.deleteAddedOnDbclick);
  }

  private setMarkerData(marker: IMapMarker, dataName: string, data: any) {
    if (marker.data == null) {
      marker.data = {};
    }
    marker.data[dataName] = data;
  }



  addInfoWindow(googleMarker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(googleMarker, 'click', () => {
      infoWindow.open(this.map, googleMarker);
      let t = document.getElementById("marker");
      console.log(t);

    });

  }
}
