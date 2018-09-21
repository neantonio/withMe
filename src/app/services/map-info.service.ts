import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
declare var google;


var rad = 6372795

export interface IMapMarker {
    lat: number;
    lng: number;
    id: string;
    index?: number;
    data?: any;
    type?: string;
}

export class GeoPoint {
    lat: number;
    lng: number;
    constructor(lat, lng) {
        this.lat = lat;
        this.lng = lng;
    }
    getGoogleLatLng() {
        return new google.maps.LatLng({ lat: this.lat, lng: this.lng });
    }
}

export class GeoBound {
    SW: GeoPoint;
    NE: GeoPoint;
    constructor(sw: GeoPoint, ne: GeoPoint) {
        this.NE = ne;
        this.SW = sw;
    }
    getGoogleBounds() {

        return new google.maps.LatLngBounds(this.SW.getGoogleLatLng(), this.NE.getGoogleLatLng());
    }

}


@Injectable()
export class MapInfoService {

    lastUserPosition: GeoPoint = null;
    definedPosition:GeoPoint=null;

    constructor(public geolocation: Geolocation) {
        this.getCurrentUserPosition();
    }

    getLastUserPosition() {
        return this.lastUserPosition;
    }

    //вернет обещание
    getCurrentUserPosition() {
        return this.geolocation.getCurrentPosition()
            .then((position) => { 
                this.lastUserPosition = new GeoPoint(position.coords.latitude, position.coords.longitude);
                                    this.definedPosition=this.lastUserPosition;
                                    console.log('map-info',this.definedPosition) });
    }

    //от последней позиции пользователя
    getDistanceTo(point: GeoPoint) {
        if (this.definedPosition == null) return null;
        return this.getDistanceBetween(this.definedPosition, point);
    }
    setDefinedPosition(point:GeoPoint){
        this.definedPosition=point;
    }
    resetDefinedPosition(){
        this.definedPosition=this.lastUserPosition;
    }


    getDistanceBetween(point1: GeoPoint, point2: GeoPoint) {

        let lt1: number, lt2: number, ln1: number, ln2: number;     //в радианах
        lt1 = point1.lat / 180 * Math.PI;
        lt2 = point2.lat / 180 * Math.PI;
        ln1 = point1.lng / 180 * Math.PI;
        ln2 = point2.lng / 180 * Math.PI;

        return rad*Math.acos(Math.sin(lt1) * Math.sin(lt2) + Math.cos(lt1) * Math.cos(lt2) * Math.cos(ln1 - ln2)); 

}

}