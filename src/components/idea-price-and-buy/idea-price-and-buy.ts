import { Component, Input } from '@angular/core';
import { IPrice } from '../../app/services/content.service'
import { ToastController } from 'ionic-angular';
import { ExternalApiService, ICurrencyConversion } from '../../app/services/external-api.service';
import { SystemService } from '../../app/services/system.service';
/**
 * Generated class for the IdeaPriceAndBuy component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'idea-price-and-buy',
  templateUrl: 'idea-price-and-buy.html'
})
export class IdeaPriceAndBuy {

  @Input() price: IPrice;
  showCurrencyConversion;
  conversionResult;
  conversionLoading;

  constructor(private eapi: ExternalApiService, private toastCtrl: ToastController,private _system:SystemService) {
   // this.price = { currency: 'rub', price: { min: 500, average: 1000, max: 1500 }, buyButtonText: 'buy' }
  }

  onShowCurrencyConversion() {
    setTimeout(this.showCurrencyConversion = true,100);
    this.conversionLoading = true;
    let valuesToConvert = [];
    if (this.price.price.min != null) valuesToConvert.push(this.price.price.min);
    if (this.price.price.average != null) valuesToConvert.push(this.price.price.average);
    if (this.price.price.max != null) valuesToConvert.push(this.price.price.max);
    this.eapi.convertCarrency(this.price.currency, ['usd', 'eur', 'gbp'], valuesToConvert).then((data) => {
      this.conversionResult = data;
      this.conversionLoading = false;

    }).catch(() => {
      console.log('currency conversion error')
      this.showCurrencyConversion = false;
      let toast = this.toastCtrl.create({
        message: 'service error',                      //УЖНО ПЕРЕВЕСТИ 
        duration: 3000
      });
      toast.present();
    })
  }
  onBuy(){ 
    this._system.openExternalURL(this.price.storeLink);
  }

  round(value) {
    return Math.round(value * 100) / 100;
  }

  canShow(){
    return typeof(this.price)!='undefined';
  }
  getCurrencySymbol(){
    if(this.price.currencySymbol!=null) return this.price.currencySymbol;
    else return this.price.currency;
  }
  

}
