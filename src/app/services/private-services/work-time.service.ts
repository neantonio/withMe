
export interface ITime {
    begin: number;           //в минутах
    duration: number;
}
export interface IWeekDayInMonth {        //например вторая суббота месяца
    day: number;
    week: number;          //начинается с 0
}
export interface IDayId {
    //для регулярной
    dayOfWeek?: number;
    dayOfMonth?: number;
    weekDayInMonth?: IWeekDayInMonth;

    //для разовой
    year?: number;
    month?: number;
    day?: number;
}
export interface IDayWorkTime {           //должны обеспечивать сплошное покытие
    dayId: IDayId;
    duration: number;        //если несколько дней с одинаковым графиком
    times: ITime[];            //должно быть упорядочено по времени и не пересекаться
}
export interface IWorkTime {
    regular: boolean;
    sessional: boolean;
    workTimes: IDayWorkTime[];              //надо ограничить максимальное кол-во в 31
    workTimeExceptions?: IDayWorkTime[];      //в какие-то дни работает не по графику  
}

export class WorkTimeService {
    private dayResolver: DayResolver;

    //кэш результатов
    private times = [];
    private sessionResolvers: SessionResolver[] = [];

    private getTimes(dayOffset: number) {  //dayOffset > 0
        if (this.times.length <= dayOffset) {
            let result = this.dayResolver.getTimes(dayOffset);
            this.times.push(result);
            return result;
        }
        else return this.times[dayOffset];
    }
    private getSessionResolver(dayOffset: number): SessionResolver {
        if (this.sessionResolvers.length <= dayOffset) {
            let result = SessionResolver.createSessionResolver(this.workTime.sessional, this.getTimes(dayOffset));
            this.sessionResolvers.push(result);
            return result;
        }
        else return this.sessionResolvers[dayOffset];
    }


    workTime: IWorkTime = null;



    initWorkTime(workTime: IWorkTime) {
        this.workTime = workTime;
        this.dayResolver = DayResolver.createDayResolver(workTime.regular);
        this.dayResolver.workTime = workTime;
    }

    getMainWorkTimeText(dayOffset: number) {
        if(this.workTime==null) return  null;
        if (dayOffset < 0) return null;
        return this.getSessionResolver(dayOffset).getMainWorkTimeText();

    }
    getRemarkLabel(dayOffset: number) {
        if (this.workTime == null) return null;
        if (dayOffset < 0) return null;
        return this.getSessionResolver(dayOffset).getRemarkLabel();
    }
    getRemarkValue(dayOffset: number) {
        if (this.workTime == null) return null;
        if (dayOffset < 0) return null;
        return this.getSessionResolver(dayOffset).getRamarkValue();
    }
    getTextAfterRemark(dayOffset: number) {
        if (this.workTime == null) return null;
        if (dayOffset < 0) return null;
        return this.getSessionResolver(dayOffset).getTextAfterRemark();
    }
    hasRemark(dayOffset: number) {
        if (this.workTime == null) return false;
        if (dayOffset < 0) return null;
        return this.getSessionResolver(dayOffset).hasRemark();
    }
    isOpenNow() {
        if (this.workTime == null) return false;
        let now = new Date();
        return this.dayResolver.isOpen(0, now.getHours() * 60 + now.getMinutes());
    }

}

abstract class DayResolver {

    static createDayResolver(regular: boolean) {
        if (regular) return new RegularDayResolver();
        else return new SessionDayResolver();
    }

    workTime: IWorkTime;
    dayOffset: number;
    getTimes(dayOffset: number): ITime[] {

        this.dayOffset = dayOffset;
        let mainResult=null,exceptionResult=null;
        if(this.workTime.workTimes!=null )mainResult = this.scanDayWorkTimes(this.workTime.workTimes);
        if(this.workTime.workTimeExceptions!=null)exceptionResult = this.scanDayWorkTimes(this.workTime.workTimeExceptions);

        if (exceptionResult != null) return exceptionResult;
        else return mainResult;

    }

    isOpen(dayOffset: number, minute: number) {
        let times = this.getTimes(dayOffset);
        if (times == null) return false;

        for (let i = 0; i < times.length; i++) {
            if ((minute >= times[i].begin) && (minute <= times[i].duration)) return true;
        }
        return false;
    }



    abstract scanDayWorkTimes(dayWorkTimes: IDayWorkTime[]);
}

class RegularDayResolver extends DayResolver {


    scanDayWorkTimes(dayWorkTimes: IDayWorkTime[]) {
        
        let today = new Date(), someDay = new Date(), tempDay = new Date();
        someDay.setDate(today.getDate() + this.dayOffset);

        for (let i = 0; i < dayWorkTimes.length; i++) {
            let dayWorkTime = dayWorkTimes[i];

            for (let j = 0; j < dayWorkTime.duration; j++) {
                tempDay.setDate(someDay.getDate() - j);
                let dayOfWeek = tempDay.getDay(), dayOfMonth = tempDay.getDate();
               
                if ((dayWorkTime.dayId.dayOfWeek == dayOfWeek) || (dayWorkTime.dayId.dayOfMonth == dayOfMonth)) {
                    return dayWorkTime.times;
                }
                if (dayWorkTime.dayId.weekDayInMonth != null) {
                    if ((dayWorkTime.dayId.weekDayInMonth.day == dayOfWeek)
                        && (dayWorkTime.dayId.weekDayInMonth.week == dayOfMonth / 7)) {
                        return dayWorkTime.times;

                    }
                }
            }
        }
        return null;
    }
}

class SessionDayResolver extends DayResolver {
    scanDayWorkTimes(dayWorkTimes: IDayWorkTime[]) {
       
        let today = new Date(), someDay = new Date(), tempDay = new Date();
        someDay.setDate(today.getDate() + this.dayOffset);

        for (let i = 0; i < dayWorkTimes.length; i++) {
            let dayWorkTime = dayWorkTimes[i];

            for (let j = 0; j < dayWorkTime.duration; j++) {
                tempDay.setDate(someDay.getDate() - j);
                
                if ((dayWorkTime.dayId.day == tempDay.getDate())
                    && (dayWorkTime.dayId.month == tempDay.getMonth())
                    && (dayWorkTime.dayId.year == tempDay.getFullYear())) {
                    return dayWorkTime.times;
                }
            }
        }
        return null;
    }
}

abstract class SessionResolver {

    static createSessionResolver(sessional: boolean, times: ITime[]) {
       
        if (sessional) return new SessionalSessionResolver(times);
        else return new ContiniousSessionResolver(times);
    }

    times: ITime[];
    abstract getMainWorkTimeText();
    abstract getRemarkLabel();         //чтобы можно было перевести
    abstract getRamarkValue();
    abstract getTextAfterRemark();
    abstract hasRemark();

    toHourString(minutes: number, hour24: boolean, symbol?) {
        let char;
        if (symbol == null) char = ':';
        else char = symbol;
        if (!hour24) {
            if (minutes > 12 * 60) minutes = minutes - 12 * 60;
        }
        let min, hour, minstr;
        hour = Math.floor(minutes / 60);
        min = minutes - hour * 60;

        if (min < 10) minstr = '0' + min;
        else minstr = min;
        return hour + char + minstr;
    }

}

class ContiniousSessionResolver extends SessionResolver {

    constructor(times: ITime[]) {
        super();
        this.times = times;
        if(times!=null){
            if (times.length > 0) {
            let result;

            let begin, end;
            begin = times[0].begin;
            end = times[times.length - 1].begin + times[times.length - 1].duration;


            this.mainText = this.toHourString(begin, false) + '-' + this.toHourString(end, false)

            //собираем массив перерывов
            for (let i = 0; i < times.length - 1; i++) {
                this.breakText = this.breakText + ' ' + (this.toHourString(times[i].begin + times[i].duration, false)
                    + '-' + this.toHourString(times[i + 1].begin, false));
            }
        }
        }
        
    }

    mainText='';
    breakText = '';


    getMainWorkTimeText() {
        if(this.times==null) return 'closed';
        return this.mainText;
    }
    getRemarkLabel() {
        return 'break';
    }
    getRamarkValue() {
        return this.breakText;
    }
    getTextAfterRemark() {
        return '';
    }
    hasRemark() {
        if(this.times==null) return false;
        return (this.breakText.length > 0);
    }

}

class SessionalSessionResolver extends SessionResolver {

    constructor(times: ITime[]) {
        super();
        this.times = times;
        if(times!=null){
            if (times.length > 0) {
            this.duration = times[0].duration;
            this.allDurationsSame = true;

            for (let i = 0; i < times.length - 1; i++) {
                if(this.mainText!=null) this.mainText=this.mainText+', ';
                else this.mainText='';
                this.mainText = this.mainText  + this.toHourString(times[i].begin, false);
                    

                if (times[i].duration != this.duration) this.allDurationsSame = false;
            }
        }
        }
        


    }
    mainText=null;
    duration;
    sessionDurationTet;
    allDurationsSame;
    getMainWorkTimeText() {
        if(this.times==null) return 'noSession';
        return this.mainText;
    }
    getRemarkLabel() {        //чтобы можно было перевести
        return 'sessionDuration'
    }
    getRamarkValue() {
        return this.toHourString(this.duration, true, '.');
    }
    getTextAfterRemark() {
        return 'h'
    }
    hasRemark() {
        if(this.times==null) return false;
        return this.allDurationsSame;
    }
}