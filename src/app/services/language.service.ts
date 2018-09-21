export class LanguageService{

     wordMap= new Map();//new Map([{havesomeTalk: 'поболтать'}]);

    get(id){
        return this.wordMap.get(id);
    }

    setWordMap(map){
        this.wordMap=new Map(map);
        console.log('map accepted');
    }
}