import { Component, Input,OnInit } from '@angular/core';
import { MathService } from '../../app/services/math.service';
import { ContentService, IImage } from '../../app/services/content.service';
import { LineItem } from '../../app/services/view-decoration.service'
import { ImageLineCreator } from '../../app/services/view-decoration/image-line-creator'
const images = [

  {
    image: "/image?id=404",
    important: false,
    width: 700,
    height: 366,
  },
  {
    image: "/image?id=415",
    important: true,
    width: 700,
    height: 406,
  }, {
    image: "/image?id=3324",
    important: false,
    width: 800,
    height: 600,
  }, {
    image: "/image?id=845",
    important: false,
    width: 700,
    height: 467,
  }, {
    image: "/image?id=1113",
    important: true,
    width: 700,
    height: 467,
  }
]

// от имэдж-контейнера отличается тем, что принимает уже подготовленную структуру данных

@Component({
  selector: 'image-container',
  templateUrl: 'image-container.html'
})
export class ImageContainer implements OnInit {

  d: number;
  @Input()root: LineItem;

  @Input()
  images: string[];

  constructor(private _m: MathService) {

   // this.creator = new ImageLineCreator();
    //this.creator.useImportantField = true;
   
    //console.log(this.root);
  }
  ngOnInit(){
    // this.random();
  }
  //creator;
 
  //random() {
   // this.root = this.creator.createRandomLineElement(images);
   // this.root.computeSize();
  //}

}

