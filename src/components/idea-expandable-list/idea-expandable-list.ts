import { Component, ContentChild, TemplateRef, Input, ViewChild, OnInit, ElementRef, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { Platform } from 'ionic-angular';


/*
для использования необходимо 
передать шаблон для создания одного элемента(заключив его в ng-template) и исходный массив элементов data
для динамической подгрузки данных необходимо передать callbackToGetData
по умолчанию кнопки раскытия и сворачивания выполнены ion-button с текстом expand и hide. анимация по умолчанию drop
можно задать форму этих кнопок в тегах expand-button hide-button. В каждом из этих тегов должен быть элемент с классом expand-button hide-button соответственно. К нему будет добавлен слушатель на соответствующее действие
Можно указать эфекты анимации и текст кнопок
*/

@Component({
  selector: 'idea-expandable-list',
  templateUrl: 'idea-expandable-list.html',
  animations: [
    trigger('background', [
      state('expanded', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),

      transition('* => expanded', animate('100ms ease-in')),
      transition('expanded => *', animate('100ms ease-out'))
    ])
  ]

})
export class IdeaExpandableList implements OnInit {

  @ContentChild(TemplateRef) itemTemplate: TemplateRef<any>;

  @ViewChild('origin') origin;
  @ViewChild('originButton') originButton;
  @ViewChild('copy') copy;
  @ViewChild('copyWrapper') copyWrapper;

  @ViewChild('expandButton') expandButton;
  @ViewChild('hideButton') hideButton;

  @ViewChild('closeButton') closeButton;

  @Input() data;
  @Input() callbackToGetData = null;    //текущие данные надо передать в колбэк чтобы загружать новые данные с определенной позиции. в колбеке это может и не обрабытываться
  @Input('hideButtonEffect') hideButtonEffectType = 'drop';     //эффект анимации при появлении кнопки "скрыть"
  hideButtonEffect: HideButtonEffect;


  @ViewChild('expandButtonContainer') expandButtonContainer;
  @ViewChild('hideButtonContainer') hideButtonContainer;
  @ViewChild('expandButtonTemplate') expandButtonTemplate;
  @ViewChild('hidedButtonTemplate') hideButtonTemplate;

  expandedObservable: Observable<boolean>;
  expandedObserver: Observer<boolean>;

  data2 = [];
  expanded = false;
  overlapped = false;
  onClose = false;
  showExpandedContent = false;
  copyButtonBottom;
  permamentExpanded = false;      //тру непосредственно при анимации разворачивания

  customExpandButton = null;
  customHideButton = null;
  useCustomExpandButton = false;
  useCustomHideButton = false;
  useSameHideAndExpandButtons = false;


  @Input() hideFromTop = 0;   //высоты блока, который на исходной странице находится поверх контента. копия изначальных данных будет плавно над ним появляться
  hideOverFlow = true;


  constructor(private _sanitizer: DomSanitizer, private platform: Platform, private el: ElementRef) {

  }
  ngOnInit() {







    let expand = this.el.nativeElement.querySelector('idea-expand-button');
    if (expand != null) {
      console.log(expand, this.expandButtonTemplate, 'expand');
      // this.customExpandButton=expand;
      this.useCustomExpandButton = true;
      this.expandButtonContainer.nativeElement.insertAdjacentHTML('beforeend', expand.innerHTML);
      //this.expandButtonContainer.createEmbeddedView(this.expandButtonTemplate);
      this.expandButtonContainer.nativeElement.addEventListener('click', (event) => {
        this.expand()
      });
    }

    let hide = this.el.nativeElement.querySelector('idea-hide-button');
    if (hide != null) {
      // this.customHideButton=hide;
      this.useCustomHideButton = true;
      this.hideButtonContainer.nativeElement.insertAdjacentHTML('beforeend', hide.innerHTML);
    }
    else if (expand != null) {
      // this.customHideButton=expand;
      this.useCustomHideButton = true;
      this.useSameHideAndExpandButtons = true;
      this.hideButtonContainer.nativeElement.insertAdjacentHTML('beforeend', expand.innerHTML);
    }
    if (this.useCustomHideButton) this.hideButtonContainer.nativeElement.addEventListener('click', (event) => { this.hide() })

    this.hideButtonEffect = HideButtonEffect.createHideButtonEffect(this.hideButtonEffectType, this.originButton.nativeElement);

    this.expandedObservable = new Observable((observer: Observer<boolean>) => {
      this.expandedObserver = observer;
    });
    this.expandedObservable.subscribe((expandedValue) => {
      this.expanded = expandedValue;
      this.hideButtonEffect.expanded = expandedValue;
    })


  }



  expand() {

    if (this.callbackToGetData) {
      this.permamentExpanded = true;
      //TO DO сделать индикацию ожидания


      // this.callbackToGetData.call(this.data).then((data) => {
      //   this.data2 = this.data2.concat(data);
      this.loadDataValueToFillScreen();
      this.copyButtonBottom = window.screen.height - this.originButton.nativeElement.getBoundingClientRect().top - this.originButton.nativeElement.getBoundingClientRect().height - 20;
      // setTimeout(()=>{

      //this.expanded = true;
      this.expandedObserver.next(true);
      this.overlapped = true;
      setTimeout(() => this.showExpandedContent = true, 320);
      setTimeout(() => {
        this.hideOverFlow = false;

      }, 500);
      //})
    }
    //},500);
  }

  loadDataValueToFillScreen() {
    this.callbackToGetData.call(this.data).then((data) => {
      this.data2 = this.data2.concat(data);
      setTimeout(() => {
        if (this.copy.nativeElement.getBoundingClientRect().height + this.copy.nativeElement.getBoundingClientRect().top < this.platform.height()) this.loadDataValueToFillScreen()
      }, 100)
    })
  }

  hide() {
    //this.hideOverFlow=true; 
    this.permamentExpanded = false;
    this.calcTranslateY();

    this.onClose = true;

    // console.log(this.copy.nativeElement.getBoundingClientRect());
    setTimeout(() => {
      this.showExpandedContent = false;
      //this.expanded = false;
      this.expandedObserver.next(false);

      setTimeout(() => {
        this.overlapped = false;
        setTimeout(() => {
          this.copyWrapper.nativeElement.scrollTop = 0;    //для плавной анимации нужно перемещать элемент, но потом необходимо сбросить позицию прокрутки
          this.onClose = false;
        }
          , 300);
      }, 500);
    }, 500)



    //this.copyButtonBottom=window.screen.height-this.originButton.nativeElement.getBoundingClientRect().top-this.originButton.nativeElement.getBoundingClientRect().height;
  }
  getCopyLeft() {

    return this.origin.nativeElement.getBoundingClientRect().left;
  }
  getCopyTop() {

    return this.origin.nativeElement.getBoundingClientRect().top;
  }
  getCopyWidth() {
    return this.origin.nativeElement.getBoundingClientRect().width;
  }

  getCopyButtonLeft() {
    return this.originButton.nativeElement.getBoundingClientRect().left;
  }
  getCopyButtonTop() {

    return this.originButton.nativeElement.getBoundingClientRect().top;
    //return this.copyButtonBottom;
  }

  calcTranslateY() {

    this.translateY = this.copyWrapper.nativeElement.scrollTop;//this.origin.nativeElement.getBoundingClientRect().top - this.copy.nativeElement.getBoundingClientRect().top;

  }
  translateY;

  getHeaderHiderTransition() {
    let result = 'height:' + this.hideFromTop + 'px;';

    if (this.onClose) {
      result += 'transform: translateY(' + this.translateY + 'px);'
    }
    return this._sanitizer.bypassSecurityTrustStyle(result);

  }

  getCopyContentTransition() {
    let result;
    if (typeof this.copy != 'undefined') result = 'height:' + (this.copy.nativeElement.getBoundingClientRect().top + this.copy.nativeElement.getBoundingClientRect().height) + 'px;';
    else result = 'height:100vh;'

    if (this.onClose) {
      result += 'transform: translateY(' + this.translateY + 'px);'
    }
    return this._sanitizer.bypassSecurityTrustStyle(result);

  }


  getContentPos(hideFromTop?) {
    if (hideFromTop == null) hideFromTop = 0;

    let left, top, width, result, translateY;
    left = this.getCopyLeft();
    top = this.getCopyTop() - hideFromTop;
    width = this.getCopyWidth();




    result = 'left: ' + left + 'px;top: ' + top + 'px;' + 'width:' + width + 'px;';

    if (this.hideOverFlow) result = result + ' visibility:visible;';
    else result = result + ' visibility:hiden;';

    //console.log(result);
    return this._sanitizer.bypassSecurityTrustStyle(result);

  }

  getHeaderHiderHeight() {

    return this._sanitizer.bypassSecurityTrustStyle(this.hideFromTop + 'px');
  }

  getButtonTransition() {

    // let left, top, bottom;
    // left = this.getCopyButtonLeft();
    // top = this.getCopyButtonTop();
    // bottom = this.copyButtonBottom;


    // return 'left: '+left+'px;top: '+top+'px;';
    //           +'px; transform: translateY('+bottom+'px);transition:2s');

    // if (this.expanded) return this._sanitizer.bypassSecurityTrustStyle('left: ' + left + 'px;top: ' + top + 'px;'
    //   + ' transform: translateY(' + bottom + 'px);transition:  0.3s'
    // );
    // else return this._sanitizer.bypassSecurityTrustStyle('left: ' + left + 'px;top: ' + top + 'px;'
    //   + ' transform: translateY(' + 0 + 'px);transition:  0.3s' 
    // );
    return this._sanitizer.bypassSecurityTrustStyle(this.hideButtonEffect.getButtonTransition());
  }

  onScroll(event) {

    if (event.srcElement.scrollHeight - event.srcElement.scrollTop < this.copyWrapper.nativeElement.getBoundingClientRect().height + 150) {
      if (this.callbackToGetData && this.loadOnScroll) {
        this.loadOnScroll = false;
        this.callbackToGetData.call(this.data).then((data) => {

          this.data2 = this.data2.concat(data);
          setTimeout(() => this.loadOnScroll = true, 300);

        })
      }
    }
  }

  loadOnScroll = true;



}


abstract class HideButtonEffect {

  static createHideButtonEffect(type: string, expandButton): HideButtonEffect {
    let result;
    if (type.toLocaleLowerCase() == 'drop') result = new DropHideButtonEffect();
    else if (type.toLocaleLowerCase() == 'none') result = new NoHideButtonEffect();
    else if (type.toLocaleLowerCase().indexOf('move') == 0) result = new MoveHideButtonEffect(type.substring(4));
    else if (type.toLocaleLowerCase().indexOf('slide') == 0) result = new SlideHideButtonEffect(type.substring(5));

    if (result != null) {
      result.expandButton = expandButton;

    }

    return result;
  }

  set expanded(value) {
    if (this.expandedValue != value) {
      if (this.expandedValue) this.changeExpandedValueFromTrue = true;
      else this.changeExpandedValueFromTrue = false;
    }
    this.expandedValue=value;
  }
  get expanded() {
    return this.expandedValue;
  }

  getExpandButtonPosition() {

    if (this.expandButton != null) {
      let left, top;
      left = this.expandButton.getBoundingClientRect().left;
      top = this.expandButton.getBoundingClientRect().top;

      return this.getExpandButtonLeft()+this.getExpandButtonTop();
    }
    else return '';
  }

  getExpandButtonLeft(){
     if (this.expandButton != null) {
      let left;
      left = this.expandButton.getBoundingClientRect().left;
      

      return 'left: ' + left + 'px;'
    }
    else return '';
  }
  getExpandButtonTop(){
     if (this.expandButton != null) {
      let  top;
   
      top = this.expandButton.getBoundingClientRect().top;

      return 'top: ' + top + 'px;'
    }
    else return '';
  }


  expandButton;
  changeExpandedValueFromTrue = false;
  expandedValue: boolean;
  bottomPadding = 10;
  abstract getButtonTransition();
}
class NoHideButtonEffect extends HideButtonEffect {
  getButtonTransition() {
    return 'bottom:' + this.bottomPadding + 'px';
  }
}

class DropHideButtonEffect extends HideButtonEffect {
  getButtonTransition() {
    let left, top, bottom;

    bottom = window.screen.height - this.expandButton.getBoundingClientRect().top - this.expandButton.getBoundingClientRect().height - this.bottomPadding;

   
    if (this.expandedValue) return this.getExpandButtonPosition() + ' transform: translateY(' + bottom + 'px);transition:  0.3s';
    else return this.getExpandButtonPosition() + ' transform: translateY(' + 0 + 'px);transition:  0.3s';

  }
}

//все перемещающие эффекты наследуются от этого класса
abstract class TranslateHideButtonEffect extends HideButtonEffect {
  verticalMove;
  positiveDirection; // слева направо и сверху вниз
  moveValue = window.screen.width;

  constructor(direction: string) {
    super();
    if (direction.toLocaleLowerCase().indexOf('fromleft') != -1) { this.verticalMove = false; this.positiveDirection = true }
    if (direction.toLocaleLowerCase().indexOf('fromtop') != -1) { this.verticalMove = true; this.positiveDirection = true }
    if (direction.toLocaleLowerCase().indexOf('fromright') != -1) { this.verticalMove = false; this.positiveDirection = false }
    if (direction.toLocaleLowerCase().indexOf('frombottom') != -1) { this.verticalMove = true; this.positiveDirection = false }
  }

  getTranslate(moveValue) {
    let moveValueWithDirection = moveValue;
    if (!this.positiveDirection) moveValueWithDirection = -moveValue
    if (this.verticalMove) return ' transform: translateY(' + moveValueWithDirection + 'px);transition:  0.3s';
    else return ' transform: translateX(' + moveValueWithDirection + 'px);transition:  0.3s'
  }
}

class MoveHideButtonEffect extends TranslateHideButtonEffect {
  sourcePos;
  standby = true;    //чтобы вернуть элемент в исходное положение

  constructor(direction: string) {
    super(direction);
  }

  getButtonTransition() {

    if (this.expandedValue) {
      this.standby = false;
      return this.getExpandButtonLeft()+'bottom:'+this.bottomPadding+'px;' + this.getTranslate(0);
    }
    else {
      if (this.standby) return this.getExpandButtonLeft()+'bottom:'+this.bottomPadding+'px;' + this.getTranslate(-this.moveValue);
      else {
        setTimeout(() => this.standby = true, 700);
        return this.getExpandButtonLeft()+'bottom:'+this.bottomPadding+'px;' + this.getTranslate(this.moveValue);
      }
    }

  }
}

class SlideHideButtonEffect extends TranslateHideButtonEffect {

  constructor(direction: string) {
    super(direction);
  }
  getButtonTransition() {
    if (this.expandedValue) return this.getExpandButtonLeft()+'bottom:'+this.bottomPadding+'px;' + this.getTranslate(0);
    else return this.getExpandButtonLeft() +'bottom:'+this.bottomPadding+'px;' + this.getTranslate(-this.moveValue);
  }
}

