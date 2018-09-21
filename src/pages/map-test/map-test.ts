import { Component, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
// import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';
// import {
//  GoogleMaps,
//  GoogleMap,
//  GoogleMapsEvent,
//  LatLng,
//  CameraPosition,
//  MarkerOptions,
//  Marker
// } from '@ionic-native/google-maps';

import { Geolocation } from '@ionic-native/geolocation';
// import {
//   GoogleMaps,
//   GoogleMap,
//   GoogleMapsEvent,
//   LatLng,
//   CameraPosition,
//   MarkerOptions,
//   Marker
// } from '@ionic-native/google-maps';
/**
 * Generated class for the MapTest page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var google;
interface IMapMarker {
  lat: number;
  lng: number;
  id: any;
  index?: number;
  data?: any;
  icon?: string;
}


@Component({
  selector: 'page-map-test',
  templateUrl: 'map-test.html',
})
export class MapTest {
  markers=[];
  // @ViewChild('map') mapElement: ElementRef;
  // map: any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation) {
    
      this.markers.push({lat:55,lng:37,id:0},{lat:55,lng:37.5,id:1});
  }

  // ionViewDidLoad() {
  //   this.loadMap();
  // }

  // loadMap() {

  //   this.geolocation.getCurrentPosition().then((position) => {

  //     let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  //     let mapOptions = {
  //       center: latLng,
  //       zoom: 15,
  //       noClear: true,
  //       streetViewControl: false,
  //       scaleControl: false,
  //       zoomControl: false,
  //       mapTypeControl: false,
  //       mapTypeId: google.maps.MapTypeId.ROADMAP
  //     }

  //     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  //     this.addMarker(position.coords.latitude, position.coords.longitude);

  //   }, (err) => {
  //     console.log(err);
  //   });

  // }

  // addMarker(lat, long) {

  //   var template = [
  //               '<?xml version="1.0"?>',
  //                   '<svg class="svg" width="260px" height="260px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">',
  //                       '<circle stroke="#222" fill="{{ color }}" cx="50" cy="50" r="35"/>',
  //                        '<text x="0" y="35px" font-family="Roboto" >Hello, out there </text>',
  //                   '</svg>'
  //               ].join('\n');
  //           var svg = template.replace('{{ color }}', '#800');
  //           console.log(encodeURIComponent(svg));
  //    var goldStar = {
  //     //     path: 'M453.958,214.331c-3.531-26.577-16.079-51.055-35.8-69.556c-21.625-20.286-49.874-31.457-79.542-31.457'+
	// 		// 'c-4.588,0-9.318,0.322-14.343,0.979c-22.641-17.281-50.542-26.745-79.134-26.745c-30.593,0-60.141,10.807-83.651,30.513'+
	// 		// 'c-35.004,2.468-68.221,16.911-93.913,40.916c-25.706,24.017-42.375,56.158-47.176,90.821C7.219,266.12,0,286.428,0,307.378'+
	// 		// 'c0,49.209,39.105,89.621,87.876,91.676c25.144,16.624,54.271,25.394,84.459,25.394c37.963,0,74.151-13.934,102.41-39.328h96.687'+
	// 		// 'c13.997,7.673,29.676,11.714,45.549,11.714c52.394,0,95.019-42.625,95.019-95.019C512,263.371,488.963,229.09,453.958,214.331z'+
	// 		// ' M416.982,374.404c-12.902,0-25.65-3.51-36.869-10.151c-1.729-1.024-3.703-1.565-5.713-1.565h-84.242'+
	// 		// 'c2.38-6.154,3.638-12.75,3.638-19.543c0-14.462-5.638-28.065-15.876-38.303c-4.162-4.16-10.907-4.16-15.069,0'+
	// 		// 'c-4.161,4.161-4.161,10.908,0,15.068c6.213,6.213,9.636,14.464,9.636,23.236c0,7.738-2.667,15.071-7.562,20.958'+
	// 		// 'c-0.83,0.46-1.608,1.016-2.306,1.681c-24.529,23.366-56.593,36.234-90.284,36.234c-26.74,0-52.505-8.063-74.511-23.315'+
	// 		// 'c-0.299-0.208-0.611-0.394-0.927-0.571c-14.549-16.78-13.864-42.278,2.08-58.221c4.161-4.161,4.161-10.907,0-15.068'+
	// 		// 'c-4.162-4.16-10.907-4.16-15.069,0c-18.385,18.385-23.221,45.25-14.546,68.115c-27.255-9.357-46.932-35.247-46.932-65.581'+
	// 		// 'c0-16.695,6.083-32.859,17.128-45.517c1.492-1.709,2.429-3.832,2.689-6.086c3.547-30.678,17.979-59.232,40.639-80.402'+
	// 		// 'c17.293-16.157,38.579-27.233,61.457-32.233c-2.707,7.035-4.14,14.574-4.14,22.334c0,16.597,6.471,32.21,18.22,43.959'+
	// 		// 'c2.08,2.08,4.807,3.12,7.534,3.12s5.453-1.041,7.534-3.12c4.161-4.161,4.161-10.908,0-15.069'+
	// 		// 'c-7.726-7.725-11.98-17.985-11.98-28.891c0-9.896,3.514-19.255,9.935-26.676c0.691-0.39,1.348-0.847,1.948-1.382'+
	// 		// 'c19.859-17.69,45.337-27.433,71.743-27.433c19.066,0,37.752,5.092,54.097,14.54c-13.887,9.918-22.038,26.961-19.73,45.041'+
	// 		// 'c0.688,5.38,5.272,9.306,10.556,9.306c0.449,0,0.905-0.028,1.363-0.086c5.837-0.746,9.965-6.082,9.22-11.918'+
	// 		// 'c-1.854-14.518,8.448-27.838,22.967-29.693c0.545-0.07,1.07-0.192,1.584-0.339c4.811-0.716,9.238-1.087,13.421-1.087'+
	// 		// 'c44.457,0,82.394,31.462,91.732,73.781c-21.863-0.091-42.563,13.145-50.856,34.735c-2.111,5.493,0.631,11.656,6.126,13.767'+
	// 		// 'c1.256,0.483,2.547,0.712,3.818,0.712c4.282,0,8.32-2.601,9.948-6.838c5.905-15.373,22.175-23.772,37.792-20.297'+
	// 		// 'c0.847,0.581,1.774,1.061,2.78,1.397c29.676,9.906,49.615,37.559,49.615,68.81C489.57,341.841,457.007,374.404,416.982,374.404z',
  //         url:  'data:image/svg+xml;charset=UTF-8,' + (svg),
  //         fillColor: 'yellow',
  //         fillOpacity: 0.8,
  //         scale: 0.1,
         
  //       };

  //   let marker = new google.maps.Marker({
  //     map: this.map,
  //     icon:goldStar,
  //     animation: google.maps.Animation.DROP,
  //     position: new google.maps.LatLng(lat, long)
  //   });

  //   let content = "<h4><div id='marker'>4576</div></h4>";

  //   this.addInfoWindow(marker, content);

  // }
  // addInfoWindow(marker, content) {

  //   let infoWindow = new google.maps.InfoWindow({
  //     content: content
  //   });



  //   google.maps.event.addListener(marker, 'click', () => {
  //     infoWindow.open(this.map, marker);
  //     let t = document.getElementById("marker");
  //     console.log(t);
  //     if (t != null) {
  //       t = t.parentElement;
  //       console.log(t);
  //       if (t != null) {
  //         t = t.parentElement;
  //         console.log(t);
  //         if (t != null) {
  //           t = t.parentElement;
  //           console.log(t);
  //           if (t != null) {
  //             t = t.parentElement;
  //             console.log(t);
  //             if (t != null) {
  //               t = t.parentElement;
  //               //  var mySpan = document.createElement("span");
  //               // mySpan.innerHTML = "replaced anchor!";
  //               // t.parentNode.replaceChild(mySpan,t);
  //               console.log(t);
  //             }
  //           }
  //         }
  //       }

  //     }
  //   });

  // }
}
