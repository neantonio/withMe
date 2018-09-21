import { Component, Input, Output, EventEmitter, OnInit, NgZone } from '@angular/core';
import { Events } from 'ionic-angular'
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

export class ScrollAnchor {
  name?: string;
  iconName?: string;
  position: number
}


@Component({
  selector: 'scroll-controller',
  templateUrl: 'scroll-controller.html'
})
export class ScrollController implements OnInit {

  //массив должен быть отсортирован по возрастанию позиции
  @Input() anchors: ScrollAnchor[];

  @Input() get position() {
    return this.scrollPosition;
  }
  set position(value) {
    this.scrollPosition = value;
  }
  @Output() positionChange = new EventEmitter();

  currentAnchorIndex = 0;
  useIcon = false;
  scrollPosition = 0;
  zone;
  processScrolling = true;


  constructor(private ev: Events,private _sanitizer: DomSanitizer) {
    this.zone = new NgZone({ enableLongStackTrace: false });
    this.ev.subscribe('pageScrolled', (data) => {
      this.zone.run(() => {
        if (this.processScrolling) {
          this.scrollPosition = data;
          this.calcCurrentAnchor();
          
        }
      });
    
    }
    );

  }
  ngOnInit() {

    this.calcUseTextOrIcon();
    this.calcCurrentAnchor();
  }


  calcCurrentAnchor() {
    if (this.scrollPosition <= this.anchors[0].position) {
      this.currentAnchorIndex = 0;
      return;
    }
    for (let i = 1; i < this.anchors.length - 1; i++) {
      if ((this.scrollPosition > this.anchors[i].position-2) && (this.scrollPosition <= this.anchors[i + 1].position+2)) {
        this.currentAnchorIndex = i;
        return;
      }
    }
    if (this.scrollPosition > this.anchors[this.anchors.length - 1].position) {
      this.currentAnchorIndex = this.anchors.length - 1;
      return;
    }
  }

  calcUseTextOrIcon() {
    if (this.anchors.length > 3) {
      this.useIcon = true;
      for (let i = 0; i < this.anchors.length; i++) {
        if (this.anchors[i].iconName == null) {
          this.useIcon = false;
        }
      }
      return;
    }
    else {
      this.useIcon = false;
      for (let i = 0; i < this.anchors.length; i++) {
        if (this.anchors[i].name == null) {
          this.useIcon = true;
        }
      }
    }
  }

  onClick(anchor: ScrollAnchor) {

    this.processScrolling = false;
    setTimeout(() => this.processScrolling = true, 1200);  //чтобы при перемотке к нужному якорю события скроллинга не обрабатывались

    this.position = anchor.position;
    this.calcCurrentAnchor();
   // console.log(this.currentAnchorIndex);
    this.currentAnchorIndex = this.anchors.indexOf(anchor);
    //console.log(this.currentAnchorIndex);
    this.positionChange.emit(this.position);

  }

  getUnderlineTransform(){
    return this._sanitizer.bypassSecurityTrustStyle('transform: translateX('+this.currentAnchorIndex*100+'%);width:'+this.getUnderLineWidth()+'%');
  }

  getUnderLineWidth() {
    return 100 / this.anchors.length ;
  }


}
