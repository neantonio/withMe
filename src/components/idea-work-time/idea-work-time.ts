import { Component ,Input,OnInit} from '@angular/core';
import {IWorkTime,WorkTimeService} from'../../app/services/private-services/work-time.service'

/**
 * Generated class for the IdeaWorkTime component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'idea-work-time',
  templateUrl: 'idea-work-time.html'
})
export class IdeaWorkTime implements OnInit{

  @Input()workTime;

  workTimeService:WorkTimeService=new WorkTimeService();

  constructor() {
   
  }

  ngOnInit(){
   
    this.workTimeService.initWorkTime(this.workTime);
  }

}

