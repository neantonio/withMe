import { LineItem } from '../view-decoration.service'
import { IImage } from '../content.service';

//из массива изображений строит элементы lineitem со случайным наполнением. Может учитывать поле импотант

export class ImageLineCreator {
    maxColumn = 2;
    maxRow = 1;           //максимальное количество строк всего
    maxElementValueInSecondary = 3;
    minElementValueInSecondary = 2;
    maxLevel = 2;          //максимальный уровень вложенности элементов
    useImportantField = false;

    changePriorityProbability =1;
    continueRecursiveProbability = 1;
    changeDirectionProbability =1;
    sourceImages;

    createRandomLineElement(images: IImage[]): LineItem {
        this.sourceImages = images;
        let t = this.createElement(null, this.devideSourceForLargeAndSmall(images), (Math.random() > 0.5), (Math.random() > 0.5), 0);
        //console.log('t', t);
        return t;
    }

    private devideSourceForLargeAndSmall(images: IImage[]) {
        let suggestedLargeImageVAlue = this.maxColumn / 2;         //примерно каждый второй  элемент в строке пусть будет большим
        let large = [], other = [], result = { large: [], other: [] };
       // console.log(images);

        if (this.useImportantField) {
            large = images.filter((image) => { return image.important });
            other = images.filter((image) => { return !image.important });
        }
        else {
            let oneOfLengthPart = 1 / images.length;         //а можно просто брать и добавлять случайные индексы   
            for (let i = 0; i < images.length; i++) {
                if ((large.length <= suggestedLargeImageVAlue) && (Math.random() > (1 - oneOfLengthPart))) large.push(images[i]);
                else other.push(images[i]);
            }

        }
        result.large = large;
        result.other = other;
        //console.log('devided', result);
        return result;
    }

    private createPrimaryElement(images) {
        let imageToUse, index;
        if (images.large.length == 0) {
            if (images.other.length == 0) return null;
            index = Math.round(Math.random() * (images.other.length - 1));
            imageToUse = images.other[index];
            images.other.splice(index, 1);
        }
        else {
            index = Math.round(Math.random() * (images.large.length - 1));
            imageToUse = images.large[index];
            images.large.splice(index, 1);
        }
       
        return LineItem.createLineItem(this.sourceImages[this.sourceImages.indexOf(imageToUse)]);
    }

    private createSecondaryElement(images) {
        let elementsValue = this.minElementValueInSecondary + Math.round(Math.random() * (this.maxElementValueInSecondary - this.minElementValueInSecondary));
        let imagesToUse;
        if (images.other.length == 0) {
            if (images.large.length == 0) return null;
            else imagesToUse = images.large;
        }
        else imagesToUse = images.other;
        let imagesInLine = [];

        for (let i = 0; ((i < elementsValue)); i++) {
            if (imagesToUse.length == 0) break;
            let index = Math.round(Math.random() * (imagesToUse.length - 1));
            
            imagesInLine.push(imagesToUse[index]);
            imagesToUse.splice(index, 1);
        }
      
        return LineItem.createLineItem(imagesInLine);
    }

    private createElement(previosLineItems, devidedArrays, previosWasPrimary, previosSecondaryElementWasHorizontal, currentLevel): LineItem {
        //previosSecondaryElementWasHorizontal нужен для того чтобы инвертировалось направление следущего вторичного элемента или родителя, в которого он будет заворачиваться

        let result, currentIsPrimary, currentIsHorizontal=previosSecondaryElementWasHorizontal;
        if ((previosWasPrimary) && (Math.random() < this.changePriorityProbability)) {
            result = this.createSecondaryElement(devidedArrays);
            currentIsPrimary = false;

            if ((result != null)&&(result.hasMoreThenOneChild())) {
                if (previosSecondaryElementWasHorizontal) result.isHorizontal = (Math.random() > this.changeDirectionProbability);
                else result.isHorizontal = (Math.random() < this.changeDirectionProbability);

                currentIsHorizontal = result.isHorizontal;
            }
        }
        else {
            result = this.createPrimaryElement(devidedArrays);
            currentIsPrimary = true;
            
        }



        if (previosLineItems == null) previosLineItems = [];
        if (result != null) {
            previosLineItems.push(result);
        }

        //резалт = нулл если изображения совсем закончились
        if ((Math.random() < this.continueRecursiveProbability) && (currentLevel < this.maxLevel) && (result != null)&&(previosLineItems.length<this.maxColumn)) {
            return this.createElement(previosLineItems, devidedArrays, currentIsPrimary, currentIsHorizontal, currentLevel++);
        }
        else return this.finalizeLineElement(previosLineItems, currentIsHorizontal);
    }

    private finalizeLineElement(childItems, lastWasHorizontal): LineItem {
        let t = LineItem.createLineItemByChildren(childItems);

        if (lastWasHorizontal) t.isHorizontal = (Math.random() > this.changeDirectionProbability);
        else t.isHorizontal = (Math.random() < this.changeDirectionProbability);
        return t;
    }
}