import { RandomService } from '../private-services/random.service'
import { IPrice, IRangeItem } from '../content.service'

const currencies = [
    'rub', 'usd', 'eur', 'gbp'
];
const currencySymbols = [
    'р', '$', '€', '£'
]

const buyTexts = [
    'buy', 'order tickets', 'book'
]

const stores = [
    'kudago.com', 'kassir.ru', 'yandex.afisha.ru'
]
const storeLinks = [
    'http://kudago.com', 'http://kassir.ru', 'http://yandex.afisha.ru'
]

export class IdeaPriceAndBuyTest {
    randomService = new RandomService();

    createRangeItem(previous?): IRangeItem {

        let average, max, min = this.randomService.createFieldOrNull(() => this.randomService.randomInt(10, 1000), 30);

        if (min == null) {
            max = this.randomService.createFieldOrNull(() => this.randomService.randomInt(10, 1000), 30);
            if (max == null) average = this.randomService.createFieldOrNull(() => this.randomService.randomInt(10, 1000), 30);

        }

        max =this.randomService.createFieldOrNull(() => this.randomService.randomInt(min, 2000), 30); 

        if((min==null)&&(max==null)){
            average=this.randomService.randomInt(10, 2000)
        }
        

        return {
            min: min,
            max: max,
            average: average

        }
    }

    getData() {
        let buyButtonText = this.randomService.createFieldOrNull(() => this.randomService.randomFromArr(buyTexts));
        let buyInApp = this.randomService.randomBoolean();
        let storeName = null, storeLink = null;
        if (buyButtonText != null) {
            if (!buyInApp) {
                storeName = this.randomService.randomFromArr(stores);
                storeLink = storeLinks[stores.indexOf(storeName)]
            }
        }

        let currency = this.randomService.randomFromArr(currencies);
        return {
            price: {
                currency: currency,
                currencySymbol: currencySymbols[currencies.indexOf(currency)],
                buyInApp: buyInApp,
                storeLink: storeLink,
                storeName: storeName,
                price: this.createRangeItem(),
                buyButtonText: buyButtonText
            }
        }
    }
}