import { Directive, ElementRef, Renderer2, Input, Output, EventEmitter, HostListener, NgZone,OnInit } from '@angular/core';
import { Events } from 'ionic-angular'
import {StateChanger} from './online'

//фиксирует элемент при прокрутке на заданной позиции (самый верх п оумолчанию) при прокрутке
//может изменять класс элемента при фиксировании


@Directive({
    selector: '[floating]' // Attribute selector
})
export class FloatingDirective implements OnInit{

    @Input() fixedClass = null;
    @Input() fixedPosition = 0;

    @Output() fixed = new EventEmitter();

    originPosition;
    originTop;
    zone;
    stateChanger;

    constructor(private el: ElementRef, private _renderer: Renderer2, private ev: Events) {
        this.originPosition = el.nativeElement.style.position;
        this.originTop = el.nativeElement.style.top;


        this.zone = new NgZone({ enableLongStackTrace: false });
        this.ev.subscribe('pageScrolled', (data) => {
            this.zone.run(() => {

                let scrollPosition = data;

               if (scrollPosition > el.nativeElement.offsetTop) {
                if (el.nativeElement.style.position !== 'fixed') {
                    el.nativeElement.style.position = 'fixed';
                   el.nativeElement.style.top = this.fixedPosition;
                   if(this.stateChanger!=null) this.stateChanger.setChangedState();
                }
            } else {
                if (el.nativeElement.style.position === 'fixed') {
                    el.nativeElement.style.position = this.originPosition;
                    el.nativeElement.style.top = this.originTop;
                     if(this.stateChanger!=null) this.stateChanger.setOriginState();
                }
            }

            });

        })
    
  }

  ngOnInit(){
    if(this.fixedClass!=null) {
        this.stateChanger=StateChanger.createStateChanger('class',this._renderer,this.el,{class:this.fixedClass})

    }
  }
    
}