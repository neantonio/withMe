export interface IIdeaItem {
    name: string;
    description?: string;
    canBeIgnored: boolean;
    allParametersMustBeDirty?: boolean;
    dirty?: boolean;
    childItems: IIdeaItem[];
    parameters: IIdeaParameter[];
}

export interface ISelectableItem {
    description: string;
    selected: boolean;
    subcategory?: ISelectableItem[];
    icon?: string;
}

export interface IIdeaParameter {
    id?: string;
    mustBeDirty?: boolean;
    dirty?: boolean;
    type: string;
    description: string;
    stringValue: string;
    numberValue: number;
    availableStringValues: ISelectableItem[];
    dependency?: IParameterDependency;
    helperData?: ISelectableItem[];

}

export interface IDescribedItem {
    type: string;
    icon: string;
    whatToDo: string;
    where: string;
    whatEvent: string;
    withWhom: string;
}

export interface IParameterDependency {
    ideaLevel: number;
    dependsOn: string;
    type: string;
}

export class FoundCategory {
    items = [];
    constructor(upperCategory: FoundCategory) {
        if (upperCategory != null) {

            this.items = upperCategory.items.slice();
            this.compareResult = upperCategory.compareResult;
            let i = 0;
            this.origin = [];
            for (i = 0; i < upperCategory.origin.length; i++) {
                this.origin.push(upperCategory.origin[i]);
            }
        }
        else {
            this.origin = [];
        }

    }
    origin: ISelectableItem[];
    compareResult = 0;
}

const tempIdea: IIdeaItem = {
    name: 'root',
    canBeIgnored: false,
    childItems: [{
        name: 'провести вечер',
        description: 'куда',
        canBeIgnored: true,
        allParametersMustBeDirty: true,
        childItems: [{
            name: '',
            description: 'детали',
            canBeIgnored: false,
            childItems: [],
            parameters: [{
                type: 'slider-text',
                description: 'Сколько готовы потратить?',
                stringValue: '',
                numberValue: 0,
                availableStringValues: [{ description: 'до 500р', selected: false },
                { description: 'до 1000р', selected: false },
                { description: 'до 1500р', selected: false },
                { description: 'до 2000р', selected: false },
                { description: 'до 3000р', selected: false },
                { description: 'до 5000р', selected: false },
                { description: 'более 500р', selected: false }],

            }, {
                type: 'slider-text',
                description: 'Сколько человек?',
                stringValue: '',
                numberValue: 2,
                availableStringValues: [{ description: 'только я', selected: false },
                { description: 'двое', selected: false },
                { description: 'трое', selected: false },
                { description: 'четыре-пять', selected: false },
                { description: 'около десяти', selected: false },
                { description: 'много', selected: false }],

            }, {
                type: 'many-of-many',
                description: '',
                stringValue: '',
                numberValue: 5,
                availableStringValues: [{ description: 'театр', selected: false },
                { description: 'выставка', selected: true },
                { description: 'концерт', selected: false }],

            }, {
                type: 'time-parameter',
                description: '',
                stringValue: '',
                numberValue: 0,
                availableStringValues: [{ description: 'после работы\t01800007000', selected: false },
                { description: 'по дороге\t118000900000', selected: false },
                { description: 'в обед\t108001200000', selected: false }],
                helperData: [{ description: '5 мин', selected: false,subcategory:[ { description: '5', selected: false}] },
                { description: '10 мин', selected: false,subcategory:[ { description: '10', selected: false}] },
                { description: '15 мин', selected: false ,subcategory:[ { description: '15', selected: false}]},
                { description: '20 мин', selected: false ,subcategory:[ { description: '20', selected: false}]},
                { description: '30 мин', selected: false ,subcategory:[ { description: '30', selected: false}]},
                { description: '45 мин', selected: false,subcategory:[ { description: '45', selected: false}] },
                { description: '1 час', selected: false,subcategory:[ { description: '60', selected: false}] },
                { description: '1 час 30 мин', selected: false,subcategory:[ { description: '90', selected: false}] }, 
                { description: '2 часа', selected: false,subcategory:[ { description: '120', selected: false}] }]

            }]

        },],
        parameters: [{
            id: 'mainCategories',
            type: 'many-of-many-images',
            dirty: false,
            mustBeDirty: true,
            description: '',
            stringValue: '',
            numberValue: 5,
            availableStringValues: [{
                description: 'активный отдых', selected: false, icon: 'bicycle',
                subcategory: [
                    { description: 'велосипед', selected: false },
                    { description: 'roller', selected: false },
                    { description: 'пробежка', selected: false },
                    { description: 'самокат', selected: false },
                ]
            },
            {
                description: 'культурное мероприятие', selected: false, icon: 'microphone',
                subcategory: [
                    { description: 'театр', selected: false },
                    { description: 'выставка', selected: false },
                    { description: 'концерт', selected: false }
                ]

            },
            {
                description: 'саморазвитие', selected: false, icon: 'school',
                subcategory: [
                    {
                        description: 'языки', selected: false,
                        subcategory: [
                            { description: 'английский', selected: false },
                            { description: 'немецкий', selected: false },
                            { description: 'французский', selected: false },
                        ]
                    },
                    {
                        description: 'выставка', selected: false,
                        subcategory: [
                            { description: 'фотографии', selected: false },
                            { description: 'современное искусство', selected: false },
                            { description: 'живопись', selected: false },
                            { description: 'животные', selected: false },
                        ]
                    },
                    { description: 'ораторское мастерство', selected: false },
                    { description: 'программирование', selected: false },
                    { description: 'лепка', selected: false },
                    { description: 'вышивание', selected: false },
                    { description: 'вязание крючком', selected: false },
                    { description: 'гончарное дело', selected: false },
                    { description: 'кулинария', selected: false },
                ]
            },
            {
                description: 'развлечения', selected: false, icon: 'game-controller-b',
                subcategory: [
                    { description: 'бильярд', selected: false },
                    { description: 'боулинг', selected: false },

                ]
            }],

        },


        ]
    }, {
        name: 'спланировать прогулку',
        canBeIgnored: false,
        childItems: [],
        parameters: []

    }, {
        name: 'мимоходом',
        canBeIgnored: false,
        childItems: [{
            name: 'поболтать по дороге',
            canBeIgnored: false,
            childItems: [],
            parameters: []

        }, {
            name: 'узнать что-то новое',
            canBeIgnored: false,
            childItems: [],
            parameters: []

        }],
        parameters: []

    }],
    parameters: []

}

const tempDescribed: IDescribedItem[] = [{
    type: 'walk',
    icon: 'walk',
    whatToDo: 'Покататься на велосипедах',
    where: 'В парке Горького',
    whatEvent: '',
    withWhom: 'со всеми'
}, {
    type: 'idea',
    icon: 'alarm',
    whatToDo: 'Погулять по городу',
    where: 'По бульварному кольцу',
    whatEvent: 'на фестивале красок',
    withWhom: 'со студентами '
}
]


import bitap from 'bitap'

export class IdeaService {
    selectedIdeas: IIdeaItem[];
    private ideaLevel = 0;
    private currentIdeaArray: IIdeaItem[];
    private lastSelectedIdea: IIdeaItem;

    constructor() {
        this.lastSelectedIdea = tempIdea;
        this.selectedIdeas = [];


    }

    setIdea(idea: IIdeaItem) {
        this.lastSelectedIdea = idea;
    }

    getIdeaLevel(): number {
        return this.ideaLevel;
    }
    getIdeasList(): IIdeaItem[] {
        // return [tempIdea,tempIdea];
        return this.lastSelectedIdea.childItems;
    }
    getCurrentSelectedIdeaItem() {
        return this.lastSelectedIdea;
    }

    selectIdea(ideaItem: IIdeaItem) {
        this.lastSelectedIdea = ideaItem;
        this.selectedIdeas.push(ideaItem);
    }
    tryMoveToNextLevel(): boolean {
        if (this.lastSelectedIdea.childItems.length === 0) {
            return false;
        } else {
            this.currentIdeaArray = this.lastSelectedIdea.childItems;
            this.ideaLevel++;
            return true;
        }
    }

    getSelectedIdeaItems() {
        return this.selectedIdeas;
    }

    getSuggestions() {
        return tempDescribed;
    }

    getIdeaByLevel(level: number) {
        let i = 0;
        let j = 0;
        for (i = this.selectedIdeas.length - 1; i >= 0; i--) {
            if (j == level) return this.selectedIdeas[i];
            j++;
        }
        return null;
    }

    recursiveFinder(categories: ISelectableItem[], inputText: string, upperCategoryLevel: FoundCategory): FoundCategory[] {
        let i = 0;
        let result = [];
        if (upperCategoryLevel == null) upperCategoryLevel = new FoundCategory(null);

        for (i = 0; i < categories.length; i++) {
            let currentCategoryLevel = new FoundCategory(upperCategoryLevel)
            currentCategoryLevel.items.push(categories[i].description);
            currentCategoryLevel.origin.push(categories[i]);

            let compareResult = this.compareCategoryName(categories[i].description, inputText);
            if (compareResult > 0) {
                currentCategoryLevel.compareResult += compareResult;
                result.push(currentCategoryLevel);
            }
            if ((categories[i].subcategory != null) && (categories[i].subcategory.length > 0)) {
                let childResult = this.recursiveFinder(categories[i].subcategory, inputText, currentCategoryLevel);
                if (childResult.length > 0) {
                    let k = 0;
                    for (k = 0; k < childResult.length; k++) {
                        result.push(childResult[k]);
                    }

                }
            }
        }

        return result;

    }

    compareCategoryName(name: string, inputText: string) {
        let inputWords = inputText.split(' ');
        let contentWords = name.split(' ');

        //результат аккумулирует совпадени. если слово в навании категории начинается с введенного, то 0.5. Если полность совпадает, то 1.
        //если сработал нечеткий поиск то 0.4

        let i, j, result = 0;
        for (i = 0; i < contentWords.length; i++) {
            for (j = 0; j < inputWords.length; j++) {

                if (contentWords[i].indexOf(inputWords[j]) == 0) {
                    if (contentWords[i].length == inputWords[j].length) result += 1;
                    else result += 0.5;
                }
                else {
                    if (inputWords[j].length > 3) {
                        let r = bitap(inputWords[j], contentWords[i].substring(0, inputWords[j].length), 2);
                        if (r.length > 0) {
                            if (inputWords[j].charAt(0) == contentWords[i].charAt(0)) result += 0.4;
                            else result += 0.2;            //если первые буквы не совпадают, значимость результата нужно уменьшить
                        }
                    }
                }
            }
        }

        return result;

    }

    sortFoundCategories(items) {
        function sortFunction(a, b) {
            if (a.compareResult > b.compareResult) return -1;
            if (a.compareResult < b.compareResult) return 1;
            if (a.compareResult == b.compareResult) return 0;

        }
        return items.sort(sortFunction);
    }

    cleanFoundCategory(removeValue, items) {
        //если в массиве есть элементы с большим ремув валью, то с меньшимравным будут удалены
        let remove = false;
        let i = 0;
        for (i = 0; i < items.length; i++) {
            if (items[i].compareResult > removeValue) remove = true;
        }
        for (i = 0; i < items.length; i++) {
            if (items[i].compareResult <= removeValue)
                if (remove) items.splice(i, 1);
        }

    }




}
