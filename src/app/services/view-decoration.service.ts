import { IImage } from './content.service';

export abstract class LineItem {

  scale: number = 1;
  constantSize=100;
  isHorizontal = true;
 
  static createLineItem(items): LineItem {
    if (Array.isArray(items)) {
        if(items.length==0) return null;
      let children = [];
      for (let i = 0; i < items.length; i++) {

        children.push(LineItem.createLineItem(items[i]))
      }
      return new LineLineItem(children);
    }
    else return new ImageLineItem(items);
  }
  static createLineItemByChildren(items):LineItem {
      return new LineLineItem(items);
  }

  getComputedSize() {
    return this.computedSize;
  }
  abstract getProposial();
  abstract isLine();
  abstract computeSize();
  abstract hasMoreThenOneChild(); 
  proposial;
  computedSize;
  setScale(scale: number) {
    this.scale = scale;
  }
  setConstantSize(constantSize: number) {
    this.constantSize = constantSize;
  }

  setHorizontal(isHorizontal: boolean) {
    this.isHorizontal = isHorizontal;
  }
  getHorizontal() {
    return this.isHorizontal;
  }


}

class LineLineItem extends LineItem {

  private calcCompleted = false;
  computeSize() {
    this.computedSize = this.constantSize / this.getProposial();
  }
isLine() { return true; }
hasMoreThenOneChild(){
  return this.children.length>1;
}
  getProposial() {
    let proposialSum = 0;
    let childProposial = [];
    for (let i = 0; i < this.children.length; i++) {
           
      if (this.isHorizontal) childProposial.push(this.children[i].getProposial()); 
      else childProposial.push(1/this.children[i].getProposial()); ;

      proposialSum = proposialSum + childProposial[i];
    }

    for (let i = 0; i < this.children.length; i++) {
      this.children[i].computedSize = childProposial[i] * this.constantSize / proposialSum;

    }

    this.computedSize = this.constantSize / proposialSum;

    if(this.isHorizontal) this.proposial= this.constantSize/this.computedSize;
    else this.proposial= this.computedSize/this.constantSize;
   
    return this.proposial;
  }

  getChildren() {
    return this.children;
  }


  constructor(private children: LineItem[]) {
    
    super();
    //console.log('by child',this.children);
  }
}

class ImageLineItem extends LineItem {
  //scale:number;

  constructor(public image: IImage) {
    
    super();
    //console.log('line constructor',image);
  }
  computeSize() {

  }
hasMoreThenOneChild(){
  return false;
}

  getProposial() {
    return this.image.width / this.image.height;

  }
  isLine() { return false; }
  getWidth() {
    return this.image.width * this.scale;
  }
  getHeight() {
    return this.image.height * this.scale;
  }
}
export class ViewDecorationService{


    getIcon(iconName:string){
        //    if (typeof iconName == 'undefined') return null;
        // if(iconName.indexOf('-img')!=-1){

        // }
        // else{
             var template = [
                '<?xml version="1.0"?>',
                    '<svg  width="25px" height="25px" viewBox="0 0 540.201 540.201" version="1.1" xmlns="http://www.w3.org/2000/svg">',
                      
                     
		'<path d="M169.467,194.102v310.136c0,8.086,2.95,15.08,8.862,20.986c5.808,5.809,12.681,8.732,20.6,8.824'+
		'	c7.914-0.092,14.792-3.016,20.606-8.824c5.906-5.906,8.855-12.9,8.855-20.986V194.102c8.862-3.103,42.081-32.711,42.081-42.204'+
		'	V27.161c0-4.033-1.481-7.534-4.431-10.49c-2.956-2.95-6.457-4.431-10.49-4.431c-4.045,0-7.54,1.481-10.49,4.431'+
		'	c-2.956,2.962-4.431,6.457-4.431,10.49v96.99c0,4.045-1.481,7.54-4.431,10.49c-2.956,2.956-6.451,4.425-10.49,4.425'+
		'	c-4.045,0-7.54-1.469-10.49-4.425c-2.95-2.95-4.431-6.451-4.431-10.49v-96.99c0-4.033-1.481-7.534-4.431-10.49'+
		'	c-2.95-2.95-6.45-4.431-10.489-4.431c-4.045,0-7.54,1.481-10.49,4.431c-2.956,2.962-4.431,6.457-4.431,10.49v96.99'+
		'	c0,4.045-1.481,7.54-4.431,10.49c-2.956,2.956-6.451,4.425-10.49,4.425c-4.045,0-7.54-1.469-10.49-4.425'+
			'c-2.956-2.95-4.431-6.451-4.431-10.49v-96.99c0-4.033-1.475-7.534-4.431-10.49c-2.95-2.95-6.45-4.431-10.49-4.431'+
		'	c-4.045,0-7.54,1.481-10.489,4.431c-2.95,2.962-4.431,6.457-4.431,10.49v124.732C121.266,161.384,160.605,190.993,169.467,194.102z"/>',
	
                    '</svg>'
                ].join('\n');
            var svg = template.replace('{{ color }}', '#800');
            return  'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
        //}
    }
    getSelectedIcon(iconName:string){
        var template = [
                '<?xml version="1.0"?>',
                    '<svg width="26px" height="26px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">',
                        '<circle stroke="#222" fill="{{ color }}" cx="50" cy="50" r="35"/>',
                         '<text x="0" y="35px" font-family="Roboto" >Hello, out there </text>',
                    '</svg>'
                ].join('\n');
            var svg = template.replace('{{ color }}', '#555');
            return  'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
    }

    getSublightedIcon(iconName:string){
          var template = [
                '<?xml version="1.0"?>',
                    '<svg  width="25px" height="25px" fill="red" viewBox="0 0 540.201 540.201" version="1.1" xmlns="http://www.w3.org/2000/svg">',
                      
                     
		'<path d="M169.467,194.102v310.136c0,8.086,2.95,15.08,8.862,20.986c5.808,5.809,12.681,8.732,20.6,8.824'+
		'	c7.914-0.092,14.792-3.016,20.606-8.824c5.906-5.906,8.855-12.9,8.855-20.986V194.102c8.862-3.103,42.081-32.711,42.081-42.204'+
		'	V27.161c0-4.033-1.481-7.534-4.431-10.49c-2.956-2.95-6.457-4.431-10.49-4.431c-4.045,0-7.54,1.481-10.49,4.431'+
		'	c-2.956,2.962-4.431,6.457-4.431,10.49v96.99c0,4.045-1.481,7.54-4.431,10.49c-2.956,2.956-6.451,4.425-10.49,4.425'+
		'	c-4.045,0-7.54-1.469-10.49-4.425c-2.95-2.95-4.431-6.451-4.431-10.49v-96.99c0-4.033-1.481-7.534-4.431-10.49'+
		'	c-2.95-2.95-6.45-4.431-10.489-4.431c-4.045,0-7.54,1.481-10.49,4.431c-2.956,2.962-4.431,6.457-4.431,10.49v96.99'+
		'	c0,4.045-1.481,7.54-4.431,10.49c-2.956,2.956-6.451,4.425-10.49,4.425c-4.045,0-7.54-1.469-10.49-4.425'+
			'c-2.956-2.95-4.431-6.451-4.431-10.49v-96.99c0-4.033-1.475-7.534-4.431-10.49c-2.95-2.95-6.45-4.431-10.49-4.431'+
		'	c-4.045,0-7.54,1.481-10.489,4.431c-2.95,2.962-4.431,6.457-4.431,10.49v124.732C121.266,161.384,160.605,190.993,169.467,194.102z"/>',
	
                    '</svg>'
                ].join('\n');
            var svg = template.replace('{{ color }}', '#800');
            return  'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
    }
}