
//создает случайные части объектов

var dafaultTextSource=' After discussing some of the comments on this answer, once youve understood the issues with javascript dates that span a DST boundary, there is likely more than just one way to solve it. What I provided above is a simple (and tested) solution. Id be interested to know if there is a simple arithmetic/math based solution instead of having to instantiate the two new Date objects. That could potentially be faster.'

export class RandomService {

    callbackRegister = [];
    

    putCallback(callback, name) {
        if (this.getCallback(name) == null) {
            this.callbackRegister.push({
                name: name,
                callback: callback
            })
        }
        else {
            for (let i = 0; i < this.callbackRegister.length; i++) {
                if (this.callbackRegister[i].name == name) {
                    this.callbackRegister[i] = {
                        name: name,
                        callback: callback
                    };
                }
            }


        }
    }

    putRandomCallback(callbacks, name) {
        this.putCallback(this.randomFromArr(callbacks), name);
    }

    getCallback(name) {
        for (let i = 0; i < this.callbackRegister.length; i++) {
            if (this.callbackRegister[i].name === name) return this.callbackRegister[i].callback;
        }
        return null;
    }


    randomText(minWords, maxWords, source?) {
        if(source==null) source=dafaultTextSource;
        let arr=source.split(' ');
        let value=this.randomInt(minWords,maxWords);
        let result='';
        for(let i=0;i<value;i++){
            result=result+this.randomFromArr(arr)+' ';
        }
        return result;


    }
    randomInt(min, max) {
        return Math.round(this.random(min,max));
    }
    random(min, max){
        return Math.random()*(max-min)+min;
    }
    randomBoolean(trueProbability?) {
        if ((trueProbability == null)||(trueProbability > 100)) trueProbability= 50;
        return Math.random() * 100 < trueProbability;

    }

    randomFromArr(arr) {
        let index=this.randomInt(0,arr.length-1);
        return arr[index];
    }
    randomArrFromArr(arr, minResultSize, maxResultSize) {
        let resultSize=this.randomInt(minResultSize,maxResultSize);
        let result=[];
        for(let i=0;i<resultSize;i++){
            result.push(this.randomFromArr(arr));
        }
        return result;

    }

    //factoryCallback возвращает объект или нулл. должен принимать предыдущий объект
    randomArrFromCallback(factoryCallback, minResultSize, maxResultSize, previous?) {
        let resultSize=this.randomInt(minResultSize,maxResultSize);
        let result=[];
        let item=factoryCallback(previous);

        for(let i=0;i<resultSize;i++){
            if(item==null) return result;
            result.push(item);
            item=factoryCallback(item);
        }
        return result;
    }

    fromCallbackRegister(name, previous?) {
        let callback=this.getCallback(name);
        
        if(callback==null) return null;
        return callback(previous);
    }

    createFieldOrNull(fieldCallBack, nullProbability?: number) {
        if(this.randomBoolean(nullProbability)) return null;
        return fieldCallBack();

    }
}