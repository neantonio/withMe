import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


interface CurrencyApiResponce {
    base: string;
    date: string;
    rates;
}
export interface ICurrencyConversion {
    currency: string;
    results: number[]
}


@Injectable()
export class ExternalApiService {

    constructor(public http: Http) {

    }

    lastCurrencyResponse: CurrencyApiResponce = null;


    convertCarrency(from: string, to: string[], values: number[]) {
        let path = 'http://api.fixer.io/latest';
       
        let timeoutMS = 10000;
        path = path + '?base=' + from;
         let encodedPath = encodeURI(path);

        if (this.lastCurrencyResponse != null) {
            let date = new Date();

            let today, yesterday;

            today = date.getUTCFullYear() + '-' + date.getMonth() + '-' + date.getDate();

            if (this.lastCurrencyResponse.date == today) {
                return new Promise((resolve, reject) => {
                    resolve(this.calcCurrencyConvercion(to, values, this.lastCurrencyResponse));
                });
            }
            else {
                date.setDate(date.getDate() - 1);
                yesterday = date.getUTCFullYear() + '-' + date.getMonth() + '-' + date.getDate();
                if (this.lastCurrencyResponse.date == yesterday) {
                    return new Promise((resolve, reject) => {

                    });
                }



            }


        }
        console.log('getting currency');
        return new Promise((resolve, reject) => {
            this.http.get(encodedPath)
                .map(res => res.json()).subscribe(data => {
                    this.lastCurrencyResponse = data;
                    resolve(this.calcCurrencyConvercion(to, values, this.lastCurrencyResponse));

                })
        })



    }



    calcCurrencyConvercion(to: string[], values: number[], responce) {
        let result = [];
        for (let i = 0; i < to.length; i++) {
            let item = { currency: to[i], results: [] };
            for (let j = 0; j < values.length; j++) {
                item.results.push(values[j] * responce.rates[to[i].toUpperCase()]);
            }
            result.push(item);
        }
        return result;
    }

}