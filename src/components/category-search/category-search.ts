import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ISelectableItem,IdeaService,FoundCategory } from '../../app/services/idea.service';
import { MathService } from '../../app/services/math.service';
import { NgZone } from "@angular/core";

/** 
 * Generated class for the CategorySearch component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */



@Component({
  selector: 'category-search',
  templateUrl: 'category-search.html'
})
export class CategorySearch {

  @Input() rootCategories: ISelectableItem[];
  @Output() parameterChanged = new EventEmitter()
  foundCategories: FoundCategory[];
  input;
  displayFound = true;


  constructor(private zone: NgZone,private _ideaService:IdeaService) {
    //this.zone = new NgZone({ enableLongStackTrace: false });
    this.foundCategories = [];
  }

  findCagories() {
    
    let temp = this._ideaService.recursiveFinder(this.rootCategories, this.input, null);
    this._ideaService.cleanFoundCategory(0.2,temp);
    console.log(temp);
    this.foundCategories=this._ideaService.sortFoundCategories(temp);

  }

  


  selectItem(item: FoundCategory) {
    let i = 0;
    for (i = 0; i < item.origin.length; i++) {
      item.origin[i].selected = true;
    }
    this.parameterChanged.emit();
    this.hideFound();
    //  this.zone.run(() => {

    //         });
  }

  hideFound() {
    this.displayFound = false;
  }
  showFound() {
    this.displayFound = true;
  }



}
