import { GeoPoint } from './map-info.service'

export interface IContentPreview {
    image: string;
    shortDescription: string;
    lat: number;
    lng: number;
    id: string;
    category: ICategory;
    title: string;
    type?: string;                 //type - обобщенная категория. нужна для отображения на карте и основных фильтров
}
export interface IContent extends IContentPreview {
    fullDescription?: string;
    friendCategories?: ICategory[];
    contactEmail?: string;
    contactVk?: string;
    contactFb?: string;
    price?: IPrice;
    time?: IRangeItem;
    location?: ILocation;
}

export interface IContentContainer {
    content: IContentPreview;
    images: IImages;
    comments: IComments;
}

export interface ILocation {
    address?: string;
    description?: string;
    adviceCar?: string;
    advicePublicTransport?: string;
}

//допустимые варианты IRangeItem : заполено все, заполнена средняя цена, заполнена мин и макс цена
export interface IPrice {
    currency: string;
    currencySymbol:string;
    buyInApp?: boolean
    storeLink?: string;
    storeName?: string;
    price: IRangeItem;
    buyButtonText?: string;
}

export interface IRangeItem {
    min?: number;
    max?: number;
    average?: number;
}

export interface ICategory {
    indexes: number[]; //массив индексов в дереве категорий. дерево категорий должно быть получено отдельно
}

export interface IComments extends ILoadableData {
    items: IComment[];
}

export interface IImages extends ILoadableData {
    items: IImage[];
}

interface ILoadableData {
    itemId: string;
    totalItemValue: number;
    //posionOfCurrentItem: number;
    moreDataExist: boolean;
    items: any[];
}

export interface IComment {
    content: string;
    slogan?: string;
    author: IAuthor;
    date: string;
    mark?: number;
}
export interface IAuthor {
    name: string;
    id?: string;
    avatarImg?: string;
}

export interface IImage {
    image: string;
    important?: boolean;
    width: number;
    height: number;
    color?: string;     //чтобы закрасить область пока изображение грузится


}



export class ContentService {
    content: IContentPreview[];

    getContent() {
        return this.content;
    }
    setContent(content: IContentPreview[]) {
        this.content = content;
    }
    getFullContent(item: IContentPreview) {
        return new Promise((resolve, reject) => {
            resolve(

                {
                    content: {
                        image: '',
                        shortDescription: 'карьер',
                        lat: 55.5,
                        lng: 37,
                        id: 15,
                        category: { indexes: [2, 4] },
                        title: 'title',
                        type: 'place',
                        fullDescription: 'full description',
                        friendCategories: [{ indexes: [3, 4] }, { indexes: [3, 3] }],

                        price: {
                            currency: 'rub',
                            buyInApp: 'false',
                            storeLink: 'kudago.com',
                            storeName: 'storename',
                            price: { min: 20, max: 50, average: 30 },
                            buyButtonText: 'buy'
                        }

                    },
                    images: {
                        itemId: '15',
                        totalItemValue: '500',
                        //posionOfCurrentItem: number;
                        moreDataExist: true,
                        items: [

                            {
                                image: "/image?id=404",
                                important: false,
                                width: 700,
                                height: 366,
                            },
                            {
                                image: "/image?id=415",
                                important: true,
                                width: 700,
                                height: 406,
                            }, {
                                image: "/image?id=3324",
                                important: false,
                                width: 800,
                                height: 600,
                            }, {
                                image: "/image?id=845",
                                important: false,
                                width: 700,
                                height: 467,
                            }, {
                                image: "/image?id=1113",
                                important: true,
                                width: 700,
                                height: 467,
                            }
                        ]

                    },
                    comments: {
                             itemId: '15',
                        totalItemValue: '500',
                        //posionOfCurrentItem: number;
                        moreDataExist: true,
                        items: [
                    {
                        content: 'хорошее место',
                        slogan: 'slogan1',
                        author: { name: 'name1' },
                        date: '12-14-2008',
                        mark: 1
                    },
                    {
                        content: 'хорошее место2',
                        slogan: 'slogan2',
                        author: { name: 'name2' },
                        date: '10-11-2009',
                        mark: 3
                    }
                ]
                    }
                }

            )
        })
    }

    getAllComments(item: IContentPreview) { }                        //некоторые методы просто не должны быть доступны офлайн. УБРАТЬ СООТВЕТСВУЮЩИЕ КНОПКИ

    getSomeComment(item: IContentPreview, loadedComments: IComment[], valueToLoad: number) {
        return new Promise((resolve, reject) => {
            resolve(

                [
                    {
                        content: 'хорошее место',
                        slogan: 'slogan1',
                        author: { name: 'name1' },
                        date: '12-14-2008',
                        mark: 1
                    },
                    {
                        content: 'хорошее место2',
                        slogan: 'slogan2',
                        author: { name: 'name2' },
                        date: '10-11-2009',
                        mark: 3
                    }
                ]

            )
        })
    }

    getSomeData(itemId: string, valueToLoad: number, dataType: string, loadedData?: ILoadableData, beginPos?: number) {
        return new Promise((resolve, reject) => {
            if(dataType=='image') resolve(
                 {
                        itemId: '15',
                        totalItemValue: '500',
                        //posionOfCurrentItem: number;
                        moreDataExist: true,
                        items: [

                            {
                                image: "/image?id=404",
                                important: false,
                                width: 700,
                                height: 366,
                            },
                            {
                                image: "/image?id=415",
                                important: true,
                                width: 700,
                                height: 406,
                            }, {
                                image: "/image?id=3324",
                                important: false,
                                width: 800,
                                height: 600,
                            }, {
                                image: "/image?id=845",
                                important: false,
                                width: 700,
                                height: 467,
                            }, {
                                image: "/image?id=1113",
                                important: true,
                                width: 700,
                                height: 467,
                            }
                        ]

                    }
            )
            if(dataType=='comment') resolve(
                 {
                             itemId: '15',
                        totalItemValue: '500',
                        //posionOfCurrentItem: number;
                        moreDataExist: true,
                        items: [
                    {
                        content: 'хорошее место',
                        slogan: 'slogan1',
                        author: { name: 'name1' },
                        date: '12-14-2008',
                        mark: 1
                    },
                    {
                        content: 'хорошее место2',
                        slogan: 'slogan2',
                        author: { name: 'name2' },
                        date: '10-11-2009',
                        mark: 3
                    }
                ]
                    }
            )
        })
    }

    getAllSimilarContent(item: IContentPreview) { }

    getAllNearContent() { }

    getAllImages(item: IContentPreview) { }

    getCategoryString(item: IContentPreview) {
        return 'category'
    }
} 