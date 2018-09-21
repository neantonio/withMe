import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the Translate pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
var test={
  ideacreation:'Создание идеи',
  buy:'купить',
  closed:'закрыто',
  break:'перерыв',
  sessionduration:'продолжительность',
  nosession:'спектаклей нет',
  h:'ч',
  remark:'комментарий',
  bug:'ошибка',
  ok:'ok',
  cancel:'отмена',
  edit:'редактировать',
  remove:'удалить',
  book:'бронировать',
  order:'заказать',
  tickets:'билеты',
  on:'на',
  from:'от',
  to:'до'
}


@Pipe({
  name: 'translate',
})
export class Translate implements PipeTransform {

  wordMap;

  constructor(){
    this.wordMap=test;
  }
 
  transform(value: string, ...args) {
    if((value==null)||(value.length==0)) return '';
   
   let words=value.split(' ');
   let result='';
   for(let i=0;i<words.length;i++){
     result=result+this.translateWord(words[i]);
     if(i<words.length-1) result=result+' ';
   }
   return result;
    
  }

  translateWord(word){
    let firstCapital=false,allCapital=false;
    if(word[0]===word[0].toUpperCase()) {
      firstCapital=true;
      if(word[word.length-1]===word[word.length-1].toUpperCase()) allCapital=true;
    }

   let result:string=this.wordMap[word.toLowerCase()];

   if((typeof result !='undefined')&&(result!=null)) { 
     
     if(allCapital) return result.toUpperCase();
     if(firstCapital) {
       if(result.length>1)  result=result[0].toUpperCase()+result.substring(1);
       else return result.toUpperCase();
     }
     return result;     
   }
   else return word;
  }
}
