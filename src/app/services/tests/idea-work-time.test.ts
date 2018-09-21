import { ITime, IWeekDayInMonth, IDayId, IDayWorkTime, IWorkTime } from '../private-services/work-time.service'
import { RandomService } from '../private-services/random.service'

export class IdeaWorkTimeTest {

    randomService = new RandomService(); 
    maxWeekValue=3;
    maxDayValue=30;
    maxDayDifference=100;
    

    //чтобы к концу интервала не увеличивалась плотность значений будем возвращать нулл с возрастающей вероятностью
    checkDencity(currentValue,maxValue){
        if(currentValue>=maxValue) return true;
        let rand=Math.random();
        return (currentValue/maxValue>rand)

    }

    createTime(previous?) {
        let result;
        if (previous == null) {
            result = {
                begin: this.randomService.randomInt(0, 24 * 60 - 1),
                duration: this.randomService.randomInt(10, 12 * 60)
            }
        }
        else {
            if(this.checkDencity(previous.begin + previous.duration , 24 * 60 - 1)) return null
           

            result = {
                begin: this.randomService.randomInt(previous.begin + previous.duration, 24 * 60 - 1),
                duration: this.randomService.randomInt(10, 12 * 60)
            }
        }
        return result;

    }
    createWeekDayInMonth(previous?) {
        let result;
        if (previous == null) {
            result = {
                day: this.randomService.randomInt(0, 6),
                week: this.randomService.randomInt(0, this.maxWeekValue)
            }
        }
        else {
            let week = this.randomService.randomInt(previous.week, this.maxWeekValue);
            let day;
            if (week == previous.week) {
                if (previous.day == 6) {
                    if(this.checkDencity(previous.week,this.maxWeekValue)) return null;
                   
                    week++;
                    day = this.randomService.randomInt(0, 6);
                }
                else {
                    day = this.randomService.randomInt(previous.day + 1, 6)
                }
            }
            else  day = this.randomService.randomInt(0, 6);
            result = {
                day: day,
                week: week
            }
        }

        return result;


    }
    createIDayId1(previous?) {
        if (previous == null) {
            return { dayOfWeek: this.randomService.randomInt(0, 6) }
        }
        else {
            if(this.checkDencity(previous.dayOfWeek,6)) return null;
           
            return { dayOfWeek: this.randomService.randomInt(previous.dayOfWeek, 6) }
        }

    }
    createIDayId2(previous?) {
        if (previous == null) {
            return { dayOfMonth: this.randomService.randomInt(0, 30) }
        }
        else {
            if(this.checkDencity(previous.dayOfMonth,this.maxDayValue)) return null;
            
            return { dayOfMonth: this.randomService.randomInt(previous.dayOfMonth, 30) }
        }
    }
    createIDayId3(previous?) {
        let weekDay;
        if (previous == null) {
            weekDay = this.createWeekDayInMonth()
        }
        else {
            weekDay = this.createWeekDayInMonth(previous.weekDayInMonth)
        }
        if (weekDay == null) return null;
        return {
            weekDayInMonth: weekDay
        }
    }

    createIDayId4(previous?) {
        if (previous == null) {
            let today = new Date();
            today.setDate(today.getDate() + this.randomService.randomInt(0, this.maxDayValue));
            return {
                year: today.getFullYear(),
                month: today.getMonth(),
                day: today.getDate()
            }
        }
        else {
            
            let someday = new Date(previous.year , previous.month,previous.day);
           
            let today = new Date();
            if(this.checkDencity(Math.floor((someday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)),this.maxDayDifference)) return null;
            
            someday.setDate(someday.getDate() + this.randomService.randomInt(0, this.maxDayValue));
            return {
                year: someday.getFullYear(),
                month: someday.getMonth(),
                day: someday.getDate()
            }
        }
    }


    createDayWorkTime(previous?) {
        if (previous == null) {
            return {
                dayId: this.randomService.fromCallbackRegister('dayId'),
                duration: this.randomService.randomInt(1, 10),
                times: this.randomService.randomArrFromCallback(this.createTime.bind(this), 1, 4)
            }
        }
        else {
            let dayId=this.randomService.fromCallbackRegister('dayId', previous.dayId);
            if (dayId==null) return null;
            return {
                dayId: dayId,
                duration: this.randomService.randomInt(1, 10),
                times: this.randomService.randomArrFromCallback(this.createTime.bind(this), 1, 4)
            }
        }

    }
    createWorkTime() {
        let regular = this.randomService.randomBoolean();

        if (regular) this.randomService.putRandomCallback(
            [this.createIDayId1.bind(this),
            this.createIDayId2.bind(this),
            this.createIDayId3.bind(this)], 'dayId');
        else this.randomService.putCallback(this.createIDayId4.bind(this), 'dayId');

        return {
            regular: regular,
            sessional: this.randomService.randomBoolean(),
            workTimes: this.randomService.randomArrFromCallback(this.createDayWorkTime.bind(this), 1, 30),
            workTimeExceptions: this.randomService.createFieldOrNull(
                (() => this.randomService.randomArrFromCallback(this.createDayWorkTime.bind(this), 0, 5)).bind(this)
                    
            )
        }

    }

    getData(){
        return {workTime: this.createWorkTime()} ;
    }
}