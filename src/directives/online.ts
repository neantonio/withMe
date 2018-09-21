import { Directive, ElementRef, Renderer2, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { SystemService } from '../app/services/system.service';
import 'rxjs/Rx';
/**
 отслеживает подключение к сети
 для изменения отображения элемента создается массив statechangers
 по умолчанию если сети нет то просто скрывает элемент
 если нужно менять действие, то привязываемся к onlineclick /offlineclick
 */

@Directive({
  selector: '[online]' // Attribute selector
})
export class OnlineDirective implements OnInit {

  @Output() onlineClick = new EventEmitter();
  @Output() oflineClick = new EventEmitter()

  @Input('online') changersAtribute = null;

  @Input() offlineStyle;

  @Input() offlineClass;


  @HostListener('click', ['$event']) onClick($event) {
    if (this.connected) this.onlineClick.next($event);
    else this.oflineClick.next($event);
  }


  offlineClickAction = null;

  

  stateChangers = []
  connected;

  constructor(private el: ElementRef, private _renderer: Renderer2,private _system:SystemService) {
    
    _system.isOnline.subscribe((data) => {
      this.processConnectionChange(data);
    })


  }
  ngOnInit() {

    if (this.changersAtribute == null) {
      let t = new DisplayStateChanger();
      t._renderer = this._renderer;
      t.el = this.el;
      this.stateChangers.push(t);
      return
    }
    else {
      let offlineParams = {};

      offlineParams['style'] = this.offlineStyle;
      offlineParams['class'] = this.offlineClass;

      let atr = this.changersAtribute.split(' ');
      atr.forEach((item, i, arr) => {
        this.stateChangers.push(StateChanger.createStateChanger(item, this._renderer, this.el, offlineParams));
      })
    }
    console.log(this.stateChangers);
  }



  processConnectionChange(connected) {
    this.connected = connected;
    if (connected) this.stateChangers.forEach((item, i, arr) => item.setOriginState());
    else this.stateChangers.forEach((item, i, arr) => item.setChangedState());
  }

}

export abstract class StateChanger {
  _renderer: Renderer2;
  el: ElementRef;
  baseState;
  changedState;
firstChange=true;
  static createStateChanger(str, renderer, el, changedState) {
    let t;
    if (str == 'display') t = new DisplayStateChanger();
    if (str == 'class') t = new ClassStateChanger();
    if (str == 'style') t = new StyleStateChanger();

    t.changedState = changedState[str];
    t._renderer = renderer;
    t.el = el;
    return t;
  }
  setOriginState(){
    if(typeof this.changedState!='undefined') this.changeStateToOrigin();
  }
  setChangedState(){
    if(typeof this.changedState!='undefined') this.changeStateToChanged();
  }
  abstract changeStateToOrigin();
  abstract changeStateToChanged();
}

class DisplayStateChanger extends StateChanger {

  constructor(){
    super();
    this.changedState=1;   //чтобы пройти проверку на андефайнд в родителе
  }

 changeStateToOrigin() {
    this._renderer.setStyle(this.el.nativeElement, 'display', this.baseState);
  }
  changeStateToChanged() {
    this.baseState = window.getComputedStyle(this.el.nativeElement).display;

    console.log('base state', this.baseState);
    this._renderer.setStyle(this.el.nativeElement, 'display', 'none')
  }
}



class ClassStateChanger extends StateChanger {
  classes;
  changeStateToOrigin() {
    if(this.firstChange)this.classes=this.changedState.split(' ');
    this.classes.forEach((item,i,arr)=>{
       this._renderer.removeClass(this.el.nativeElement,item)
    })
   }
  changeStateToChanged() {
    console.log('state',this.changedState);
    if(this.firstChange)this.classes=this.changedState.split(' ');
    this.classes.forEach((item,i,arr)=>{
       this._renderer.addClass(this.el.nativeElement,item)
    })
   
  }
}

class StyleStateChanger extends StateChanger {
  styleUnits;
  changeStateToOrigin() {
    this.el.nativeElement.style = this.baseState;
  }
  changeStateToChanged() {
    this.baseState = JSON.parse(JSON.stringify(this.el.nativeElement.style));
    if(this.firstChange) this.styleUnits = this.changedState.split(';');
    this.firstChange=false;
    this.styleUnits.forEach((item, i, arr) => {
      let name, value, t;
      t = item.split(':');
      if (t.length == 2) {
        name = t[0];
        value = t[1];
        this._renderer.setStyle(this.el.nativeElement, name, value);
      }
    })

  }
}