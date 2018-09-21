import { Component,OnInit,Input } from '@angular/core';
import {MapInfoService,GeoPoint} from '../../app/services/map-info.service'

/**
 * Generated class for the IdeaDistance component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'idea-distance',
  templateUrl: 'idea-distance.html'
})
export class IdeaDistance implements OnInit {

  text: string;
 
   @Input() pos:GeoPoint=null;
   distance;
   letter;

  constructor(private _mapInfo:MapInfoService) {
   
  }

  ngOnInit(){
    
    this.distance=this._mapInfo.getDistanceTo(this.pos);
    
    this.calcDistanceText();
  }

  calcDistanceText(){
    if(this.distance>=1000) {
      this.letter='k'
      this.text=''+Math.round(this.distance/100)/10;
    }
    else{
      this.letter='m';
      if(this.distance>=400){
        this.text=""+Math.round(this.distance/100)*100
      }
      else{
        this.text=''+(this.distance%50)*50
      }
    }
    this.text+=this.letter;
  }


}
