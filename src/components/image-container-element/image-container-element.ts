import { Component, Input } from '@angular/core';
import {LineItem} from '../../app/services/view-decoration.service'
import { DomSanitizer } from '@angular/platform-browser';
import { ImageViewerController } from "ionic-img-viewer";
/**
 * Generated class for the ImageContainerElement component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'image-container-element',
  templateUrl: 'image-container-element.html'
})
export class ImageContainerElement {

  @Input() lineItem: LineItem;

  constructor(private sanitizer: DomSanitizer,public imageViewerCtrl: ImageViewerController) { }

  //нужно для формирования правильного соотношения сторон
  getMargin(lineItem: LineItem) {
    let result = '';
    if (this.lineItem.isHorizontal) {
      result +=  100/lineItem.proposial ;
    }
    else {
      result += 100/lineItem.proposial;
    }
    result += "% ";
    return this.sanitizer.bypassSecurityTrustStyle(result);
  }

  getStyle(lineItem: LineItem) {
    let result = "display:block; ";
    if (this.lineItem.isHorizontal) {


      result += " height:100%; ";
      result += " width:" + lineItem.getComputedSize() + "%; ";
      return this.sanitizer.bypassSecurityTrustStyle(result);
    }
    else {

      result += " width:100%; ";
      result += " height:" + lineItem.getComputedSize() + "%; ";
      return this.sanitizer.bypassSecurityTrustStyle(result);
    }
  }

  getParentStyle(lineItem: LineItem) {
    let result = " position:absolute; display:flex;top:0;width:100%;";
    if (this.lineItem.isHorizontal) {
     
      result += " width:100%; ";
      //result += " height:" + lineItem.getComputedSize() + "%; ";
      return this.sanitizer.bypassSecurityTrustStyle(result);
    }
    else {
     
      result += "flex-direction:column;"
    //  result += " height:100%; ";
      //result += " width:" + lineItem.getComputedSize() + "%; ";
      return this.sanitizer.bypassSecurityTrustStyle(result);
    }
  }

}
