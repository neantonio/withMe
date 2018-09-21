import { RandomService } from '../private-services/random.service'
import {IComment} from '../content.service'

const avatars=[
    'https://pp.userapi.com/c639827/v639827250/3e250/Mw6RBL4z3Hg.jpg',
    'https://pp.userapi.com/c841339/v841339355/23bd0/flJF2e4W_ms.jpg',
    'https://pp.userapi.com/c638623/v638623342/253cc/Shy9_pzU8Pw.jpg',
    'https://pp.userapi.com/c840123/v840123576/2e421/wK8gnYDrLtw.jpg',
    'https://pp.userapi.com/c621701/v621701871/21426/NtASliEwyBM.jpg',
    'https://pp.userapi.com/c841222/v841222135/24389/FEgnggtSaFs.jpg'

];

const tempManNames=
    `АбрамАвазАвгустинАвраамАгапАгапитАгафонАдамАдрианАзаматАзатАйдарАйрат
    АкакийАкимАланАлександрАлексейАлиАликАлиханАлмазАльбертАмирАмирамАнар
    АнастасийАнатолийАнгелАндрейАнзорАнтонАнфимАрамАристархАркадийАрманАрмен
    АрсенАрсенийАрсланАртёмАртемийАртурАрхипАскарАсханАхметАшот
    БахрамБлезБогданБорисБориславБрониславБулат
    ВадимВалентинВалерийВальдемарВарданВасилийВениаминВикторВильгельмВитВиталийВладимирВладиславВладленВласВсеволодВячеслав
    ГавриилГамлетГарриГеннадийГенриГенрихГеоргийГерасимГерманГерманнГлебГордейГригорийГустав
    ДавидДавлатДамирДанаДаниилДаниславДаниярДарийДауренДемидДемьянДенисДжамалДжеймсДжереми
    ДжозефДжонатанДикДинарДиноДмитрийДобрыняДоминик
    ЕвгенийЕвдокимЕвсейЕвстахийЕгорЕлисейЕмельянЕремейЕфимЕфрем
    ЖданЖерарЖигер
    ЗакирЗаурЗахарЗенонЗигмундЗиновийЗурабЗуфар
    ИбрагимИванИгнатИгнатийИгорьИероним
    ИисусИльгизИльнурИльшатИльяИмранИннокентийИраклийИсаакИсаакийИсидорИскандерИсламИсмаилИтан
    КазбекКамильКаренКаримКарлКимКирКириллКлаусКлимКонрадКонстантинКорнелийКристианКузьма
    ЛаврентийЛевЛенарЛеонЛеонардЛеонидЛеопольдЛоренсЛукаЛукиллианЛукьянЛюбомирЛюдвигЛюдовикЛюций
    МаджидМайклМакарМакарийМаксимМаксимилианМаксудМансурМарМаратМаркМарсельМартин
    МатвейМахмудМикаМикулаМилославМиронМирославМихаилМоисейМстиславМуратМуслимМухаммедМэтью
    НазарНаильНесторНикитаНикодимНиколаНиколайНильс
    ОгюстОлегОливерОрестОрландоОсип
    ОскарОстапОстин
    ПётрПавелПанкратПатрикПедроПерриПлатонПотапПрохор
    РавильРадийРадикРадомирРадославРазильРайанРаймондРамазанРамизРамильРамонРанельРасимРасулРатмирРафаэльРафикРашидРинат
    РичардРобертРодионРоланРоманРостиславРубенРудольфРусланРустамРэй
    СавваСавелийСаидСаматСамвелСамирСамуилСанжарСаниСвятославСевастьянСемёнСерафимСергейСидорСпартакСтаниславСтепанСултан
    ТагирТайлерТамазТамерланТарасТигранТимофейТимурТихонТомасТрофим
    УинслоуУмарУстин
    ФёдорФазильФаридФедотФеликсФилиппФлорФомаФредФридрих
    ХабибХакимХаритон
    ЦезарьЦефасЦецилий
    Цицерон
    ЧарльзЧеславЧингиз
    ШамильШарльШерлок
    ЭдгарЭдуардЭльдарЭмильЭминЭрикЭркюльЭрминЭузебио
    ЮлианЮлийЮнусЮрийЮстинианЮстус
    ЯковЯнЯромирЯрослав
`
const tempWomanNames=`АвгустаАвгустинаАвдотьяАврораАгапияАгатаАгафьяАглаяАгнияАгундаАдаАделаидаАделина
АдельАдиляАдрианаАзаАзалияАзизаАидаАишаАйгеримАйгульАйлинАйнагульАйнурАйсель
АйсунАйсылуАксиньяАлёнаАланаАлевтинаАлександраАлестаАлинаАлисаАлияАллаАлсу
АльбаАльбинаАльфияАляАмалияАминаАмираАнаитАнастасияАнгелинаАнжелаАнжеликаАнисья
АннаАнтонинаАнфисаАполлинарияАрабеллаАрианаАринаАсельАсияАстридАсяАэлита
БаженаБеатрисБелаБелиндаБеллаБертаБогданаБожена
ВалентинаВалерияВандаВанессаВарвараВасилинаВасилисаВенераВераВероникаВестаВетаВикторинаВикторияВиленаВиолаВиолеттаВитаВиталина
ВладаВладанаВладислава
ГабриэллаГалинаГалияГенриеттаГоарГретаГульзираГульмираГульназГульнараГульшатГюзель
ДалидаДамираДанаДаниэлаДанияДараДаринаДарьяДаянаДжамиляДженнаДженниферДжессикаДжиневраДианаДильназДильнараДиляДилярамДинаДинараДолоресДоминикаДомнаДомника
ЕваЕвангелинаЕвгенияЕвдокияЕкатеринаЕленаЕлизаветаЕсения
ЖаклинЖаннаЖансаяЖасминЖозефинаЖоржина
ЗабаваЗаираЗалинаЗамираЗараЗаремаЗаринаЗемфираЗинаидаЗитаЗлатаЗлатославаЗорянаЗояЗульфияЗухра
Иветта
ИзабеллаИллирикаИлонаИльзираИлюзаИнгаИндираИнессаИннаИоаннаИраИрадаИраидаИринаИрмаИскраИя
КамилаКамиллаКараКаринаКаролинаКираКлавдияКлараКораКорнелияКристинаКсения
ЛадаЛанаЛараЛарисаЛаураЛейлаЛеонаЛераЛесяЛианаЛидияЛикаЛилиЛилианаЛилияЛинаЛиндаЛиораЛираЛияЛолаЛолитаЛораЛуиза
ЛукерьяЛукияЛюбаваЛюбовьЛюдмилаЛюсильЛюсьенаЛюцияЛючеЛяйсанЛяля
МавилеМавлюдаМагдаМагдалeнаМадинаМадленМайяМакарияМаликаМараМаргаритаМарианнаМарикаМаринаМарияМариямМартаМарфаМелания
МелиссаМикаМилаМиладаМиланаМиленМиленаМилицаМилославаМираМирославаМирраМияМоникаМуза
НадеждаНаиляНаимаНанаНаомиНаргизаНатальяНеллиНеяНикаНикольНинаНинельНоминаНораНурия
ОдеттаОксанаОктябринаОлесяОливияОльгаОфелия
ПавлинаПатрицияПаулаПейтонПелагеяПеризатПлатонидаПолинаПрасковья
РадаРазинаРаисаРаминаРегинаРезедаРенаРенатаРианаРианнаРикардаРиммаРинаРитаРогнедаРозаРузалияРузаннаРусалинаРусланаРуфинаРуфь
СабинаСабринаСажидаСаидаСамираСандраСанияСараСатиСафияСафураСветланаСевараСерафимаСильвияСнежанаСоняСофьяСтеллаСтефанияСусанна
ТаисияТамараТамилаТараТатьянаТаянаТеонаТерезаТинаТомирисТора
УльянаУрсулаУстинья
ФёклаФазиляФаинаФаридаФаризаФатимаФерузаФирузаФлораФлорентинаФлоренция
ФлорианаФредерикаФрида
ХадияХилариХлоя
ЦаганаЦветанаЦецилия
Циара
ЧелсиЧеславаЧулпан
ШакираШарлоттаШахинаШейлаШеллиШерил
ЭвелинаЭвитаЭлеонораЭлианаЭлизаЭлинаЭллаЭльвинаЭльвираЭльмираЭльнараЭляЭмилиЭмилияЭммаЭнжеЭрикаЭрминаЭсмеральдаЭсмираЭтельЭтери
ЮлияЮнаЮнияЮнона
ЯдвигаЯнаЯнинаЯринаЯрославаЯсмина`

const sirnames=`ИвановВасильевПетровСмирновМихайловФёдоровСоколовЯковлевПоповАндреев
АлексеевАлександровЛебедевГригорьевСтепановСемёновПавловБогдановНиколаевДмитриевЕгоровВолковКузнецов
НикитинСоловьёвТимофеевОрловАфанасьевФилипповСергеевЗахаровМатвеевВиноградовКузьмин
МаксимовКозловИльинГерасимовМарковНовиковМорозовРомановОсиповМакаровЗайцевБеляев
ГавриловАнтоновЕфимовЛеонтьевДавыдовГусевДаниловКиселёвСорокинТихомировКрылов
НикифоровКондратьевКудрявцевБорисовЖуковВоробьёвЩербаковПоляковСавельевШмидт
ТрофимовЧистяковБарановСидоровСоболевКарповБеловМиллерТитовЛьвовФроловИгнатьевКомаров
ПрокофьевБыковАбрамовГолубевПономарёвПокровскийМартыновКирилловШульцМироновФоминВласов
ТроицкийФедотовНазаровУшаковДенисовКонстантиновВоронинНаумов
БиковецьГоробчэнкоВэдмидьМэдвидьВовковВовчукЛисэнкоЛысицин 
БыкЗаецьЗайчукСоловэйСоколэнкоКрильКороль
КотыкКотэнкоОрлэнкоСоколовСоменко
СомчукСоменкоТурэнкоКобчыкЛастовка 
ВоробейГоробэцьСомЩучкаЩупэнко
`

const someText=`Итак, мой самый полный отзыв об отеле Beton Brut и об отдыхе в Анапе в целом. Пишу, потому что всегда сама читаю отзывы‍Надеюсь, кому то пригодится. 
Итак, начнём с отеля. Отель Beton Brut SPA находится в 13-15 км от самого города Анапа. ‍♀️Дорога на такси от вокзала заняла минут 20 максимум. Что сразу понравилось это то, что отель находится в дали от всего эпицентра курортной жизни. Здесь свой Мир. 
Дизайн отеля придётся по душе любителям простоты в сочетании со стилем и уютом. Loft выдержан в каждой детали. ☝Большой и просторный холл, приветственный напиток сразу располагает. Регистрация .... и вот вы заселяетесь в номер. Сразу замечу, что выбирая отель нас зацепил именно стиль номера. Взяли стандарт с видом на море. Номер очень удобный. В номере: огромная супер мягкая кровать, утюг, гладильная доска, чайник, чай кофе, сахар, вода, халат, тапочки, фен, душевые принадлежности, 4 полотенца на человека, на балконе столик, стульчики, сушилка для белья.Для семейных пар с детьми предоставляют коляски, стульчики в столовой, детские кроватки бесплатно предоставляются велосипеды и самокаты
`

export class IdeaCommentTest{

    manNames;
    womanNames;
    sirnames;

    constructor(){
        tempManNames.replace('/n','');
        tempWomanNames.replace('/n','');
        sirnames.replace('/n','');
        tempManNames.replace(' ','');
        tempWomanNames.replace(' ','');
        sirnames.replace(' ','');
        this.manNames=this.nameStringToArr(tempManNames);
        this.womanNames=this.nameStringToArr(tempWomanNames);
        this.sirnames=this.nameStringToArr(sirnames);
        console.log(this.manNames,this.womanNames,this.sirnames);
    }

    private getSirname(sirname,isMan){
        if(isMan) return sirname;
        if(sirname.length<3) return sirname;
        let end=sirname.substring(sirname.length-2,sirname.length);
       
        if((end=='ев')||(end=='ёв')||(end=='ов')||(end=='ин')) return sirname+'а';
        if(end=='ий') return sirname.substring(0,sirname.length-3)+'ая';
        return sirname;
    }

    randomService:RandomService = new RandomService();

    private nameStringToArr(nameString:string){
        let result=[],nameBegin=0;
        for(let i=0;i<nameString.length;i++){
            let char:string=nameString[i];
            if(char==char.toUpperCase()){
               
                if(i!=0) {
                    let name=nameString.substring(nameBegin,i);
                   if(name.length>1) result.push(name);
                }
                nameBegin=i;
                
            }
        }
        return result
    }

    createName(){
        let result;
        if(this.randomService.randomBoolean()){
            result= this.randomService.randomFromArr(this.manNames);
            if(this.randomService.randomBoolean(75))result=result+' '+this.randomService.randomFromArr(this.sirnames);
        }
        else{
            result= this.randomService.randomFromArr(this.womanNames);
              if(this.randomService.randomBoolean(75))result=result +' '+this.getSirname(this.randomService.randomFromArr(this.sirnames),false);
        }
        return result;
    }

    createAuthor(previous?){
        return{
            name: this.createName(),
            avatarImg: this.randomService.createFieldOrNull(()=>this.randomService.randomFromArr(avatars),40)
        }
    }
    createDate(previous?){
        return this.randomService.randomInt(1,30)+'/'
        +this.randomService.randomInt(1,12)+'/'+
        this.randomService.randomInt(2015,2017);
    }
    getData(){
        return{comment:{
            content: this.randomService.randomText(5,80,someText),
            slogan: this.randomService.createFieldOrNull(()=>this.randomService.randomText(1,7),30),
            author: this.createAuthor(),
            date: this.createDate(),
            mark: this.randomService.createFieldOrNull(()=>this.randomService.randomInt(1,5),20)
        }}
    }

    

    
}