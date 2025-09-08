import {PersoCommon, Sexe} from "../../../types/perso/Perso";
import {getEffetsDeCoterieSurCompetences} from "../EffetsDesCoteriesSurPerso";
import {augmenterCompetence, getValeurCompetence, TypeCompetence} from "../../../types/perso/comps/Comps";
import {Coterie, EffectDeCoterieSurPerso} from "../../../types/Coterie";
import {getValeurVertu, getValeurVice, Vertus, Vices} from "../../../types/ViceVertu";
import {soignerBlessureAleatoire} from "../../../fonctions/sante/sante";
import {getPrenom} from "../../../fonctions/noms";
import {getQuartierDeCoterie} from "../Quartiers";
import {effetDeBaseEnRejoignantUneCoterie} from "../../../fonctions/coteries/generales";

export const ORKS_PRENOMS_M: string[] = ['Ghazat','Abghat','Adgulg','Aghed','Agugh','Aguk','Almthu','Alog','Ambilge','Apaugh','Argha','Argigoth','Argug','Arpigig','Auhgan','Azhug','Bagdud','Baghig','Bahgigoth','Bandagh','Barfu','Bargulg','Baugh','Bidgug','Bildud','Bilge','Bog','Boghat','Bogugh','Borgan','Borug','Braugh','Brougha','Brugagh','Bruigig','Buadagh','Buggug','Builge','Buimghig','Bulgan','Bumhug','Buomaugh','Buordud','Burghed','Buugug','Cabugbu','Cagan','Carguk','Carthurg','Clog','Corgak','Crothu','Cubub','Cukgilug','Curbag','Dabub','Dakgorim','Dakgu','Dalthu','Darfu','Deakgu','Dergu','Derthag','Digdug','Diggu','Dilug','Ditgurat','Dorgarag','Dregu','Dretkag','Drigka','Drikdarok','Drutha','Dudagog','Dugarod','Dugorim','Duiltag','Durbag','Eagungad','Eggha','Eggugat','Egharod','Eghuglat','Eichelberbog','Ekganit','Epkagut','Ergoth','Ertguth','Ewkbanok','Fagdud','Faghig','Fandagh','Farfu','Farghed','Fargigoth','Farod','Faugh','Feldgulg','Fidgug','Filge','Fodagog','Fogugh','Fozhug','Frikug','Frug','Frukag','Fubdagog','Fudhagh','Fupgugh','Furbog','Futgarek','Gaakt','Garekk','Gelub','Gholug','Gilaktug','Ginug','Gnabadug','Gnadug','Gnalurg','Gnarg','Gnarlug','Gnorl','Gnorth','Gnoth','Gnurl','Golag','Golub','Gomatug','Gomoku','Gorgu','Gorlag','Grikug','Grug','Grukag','Grukk','Grung','Gruul','Guag','Gubdagog','Gudhagh','Gug','Gujarek','Gujek','Gujjab','Gulm','Gulrn','Gunaakt','Gunag','Gunug','Gurukk','Guthakug','Guthug','Gutjja','Hagob','Hagu','Hagub','Haguk','Hebub','Hegug','Hibub','Hig','Hogug','Hoknath','Hoknuk','Hokulk','Holkurg','Horknuth','Hrolkug','Hugagug','Hugmug','Hugolm','Ig','Igmut','Ignatz','Ignorg','Igubat','Igug','Igurg','Ikgnath','Ikkath','Inkathu','Inkathurg','Isagubat','Jogug','Jokgagu','Jolagh','Jorgagu','Jregh','Jreghug','Jugag','Jughog','Jughragh','Jukha','Jukkhag','Julakgh','Kabugbu','Kagan','Kaghed','Kahigig','Karfu','Karguk','Karrghed','Karrhig','Karthurg','Kebub','Kegigoth','Kegth','Kerghug','Kertug','Kilug','Klapdud','Klog','Klughig','Knagh','Knaraugh','Knodagh','Knorgh','Knuguk','Knurigig','Kodagog','Kog','Kogan','Komarod','Korgak','Korgulg','Koughat','Kraugug','Krilge','Krothu','Krouthu','Krugbu','Krugorim','Kubub','Kugbu','Kukgilug','Kulgha','Kupgugh','Kurbag','Kurmbag','Laghed','Lamgugh','Mabub','Magdud','Malthu','Marfu','Margulg','Mazhug','Meakgu','Mergigoth','Milug','Mudagog','Mugarod','Mughragh','Mugorim','Murbag','Naghat','Naghig','Naguk','Nahgigoth','Nakgu','Narfu','Nargulg','Narhbub','Narod','Neghed','Nehrakgu','Nildud','Nodagog','Nofhug','Nogugh','Nomgulg','Noogugh','Nugbu','Nughilug','Nulgha','Numhug','Nurbag','Nurghed','Oagungad','Oakgu','Obghat','Oggha','Oggugat','Ogharod','Oghuglat','Oguk','Ohomdud','Ohulhug','Oilug','Okganit','Olaghig','Olaugh','Olmthu','Olodagh','Olog','Omaghed','Ombilge','Omegugh','Omogulg','Omugug','Onog','Onubub','Onugug','Oodagh','Oogorim','Oogugbu','Oomigig','Opathu','Opaugh','Opeghat','Opilge','Opkagut','Opoguk','Oquagan','Orgha','Orgoth','Orgug','Orpigig','Ortguth','Otugbu','Ougha','Ougigoth','Ouhgan','Owkbanok','Paghorim','Pahgigoth','Pahgorim','Pakgu','Parfu','Pargu','Parhbub','Parod','Peghed','Pehrakgu','Pergu','Perthag','Pigdug','Piggu','Pitgurat','Podagog','Pofhug','Pomgulg','Poogugh','Porgarag','Pregu','Pretkag','Prigka','Prikdarok','Prutha','Pughilug','Puiltag','Purbag','Qog','Quadagh','Quilge','Quimghig','Quomaugh','Quordud','Quugug','Raghat','Raguk','Rakgu','Rarfu','Rebub','Rilug','Rodagog','Rogan','Romarod','Routhu','Rugbu','Rugorim','Rurbag','Rurigig','Sabub','Saghig','Sahgigoth','Sahgorim','Sakgu','Salthu','Saraugug','Sarfu','Sargulg','Sarhbub','Sarod','Sbghat','Seakgu','Sguk','Shomdud','Shulhug','Sildud','Silge','Silug','Sinsbog','Slaghig','Slapdud','Slaugh','Slodagh','Slog','Slughig','Smaghed','Smegugh','Smogulg','Snog','Snubub','Snugug','Sodagh','Sog','Sogorim','Sogugbu','Sogugh','Sombilge','Somigig','Sonagh','Sorgulg','Sornaraugh','Soughat','Spathu','Speghat','Spilge','Spoguk','Squagan','Stugbu','Sudagog','Sugarod','Sugbu','Sugha','Sugigoth','Sugorim','Suhgan','Sulgha','Sulmthu','Sumhug','Sunodagh','Sunuguk','Supaugh','Supgugh','Surbag','Surgha','Surghed','Surgug','Surpigig','Tagdud','Taghig','Tandagh','Tarfu','Targhed','Targigoth','Tarod','Taugh','Teldgulg','Tidgug','Tilge','Todagog','Tog','Toghat','Togugh','Torgan','Torug','Tozhug','Traugh','Trilug','Trougha','Trugagh','Truigig','Tuggug','Tulgan','Turbag','Turge','Ug','Ugghra','Uggug','Ughat','Ulgan','Ulmragha','Ulmrougha','Umhra','Umragig','Umruigig','Ungagh','Unrugagh','Urag','Uraugh','Urg','Urgan','Urghat','Urgran','Urlgan','Urmug','Urug','Urulg','Vabugbu','Vagan','Vagrungad','Vagungad','Vakgar','Vakgu','Vakmu','Valthurg','Vambag','Vamugbu','Varbu','Varbuk','Varfu','Vargan','Varguk','Varkgorim','Varthurg','Vegum','Vergu','Verlgu','Verthag','Verthurg','Vetorkag','Vidarok','Vigdolg','Vigdug','Viggu','Viggulm','Viguka','Vitgurat','Vitgut','Vlog','Vlorg','Vorgak','Vorgarag','Vothug','Vregu','Vretkag','Vrigka','Vrikdarok','Vrogak','Vrograg','Vrothu','Vruhag','Vrutha','Vubub','Vugub','Vuiltag','Vukgilug','Vultog','Vulug','Vurbag','Wakgut','Wanug','Wapkagut','Waruk','Wauktug','Wegub','Welub','Wholug','Wilaktug','Wingloug','Winug','Woabadug','Woggha','Woggugat','Wogharod','Woghuglat','Woglug','Wokganit','Womkug','Womrikug','Wonabadug','Worthag','Wraog','Wrug','Wrukag','Wrukaog','Wubdagog','Wudgh','Wudhagh','Wudugog','Wuglat','Wumanok','Wumkbanok','Wurgoth','Wurmha','Wurtguth','Wurthu','Wutgarek','Xaakt','Xago','Xagok','Xagu','Xaguk','Xarlug','Xarpug','Xegug','Xepug','Xig','Xnath','Xnaurl','Xnurl','Xoknath','Xokuk','Xolag','Xolkug','Xomath','Xomkug','Xomoku','Xonoth','Xorag','Xorakk','Xoroku','Xoruk','Xothkug','Xruul','Xuag','Xug','Xugaa','Xugag','Xugagug','Xugar','Xugarf','Xugha','Xugor','Xugug','Xujarek','Xuk','Xulgag','Xunaakt','Xunag','Xunug','Xurek','Xurl','Xurug','Xurukk','Xutag','Xuthakug','Xutjja','Yaghed','Yagnar','Yagnatz','Yahg','Yahigig','Yakgnath','Yakha','Yalakgh','Yargug','Yegigoth','Yegoth','Yerghug','Yerug','Ymafubag','Yokgagu','Yokgu','Yolmar','Yonkathu','Yregh','Yroh','Ysagubar','Yughragh','Yugug','Yukgnath','Yukha','Yulakgh','Yunkathu','Zabghat','Zabub','Zaghig','Zahgigoth','Zahgorim','Zalthu','Zaraugug','Zarfu','Zargulg','Zarhbub','Zarod','Zeakgu','Zguk','Zildud','Zilge','Zilug','Zinsbog','Zlapdud','Zlog','Zlughig','Zodagh','Zog','Zogugbu','Zogugh','Zombilge','Zonagh','Zorfu','Zorgulg','Zorhgigoth','Zornaraugh','Zoughat','Zudagog','Zugarod','Zugbu','Zugorim','Zuhgan','Zulgha','Zulmthu','Zumhug','Zunodagh','Zunuguk','Zupaugh','Zupgugh','Zurbag','Zurgha','Zurghed','Zurgug','Zurpigig','Atulg','Azuk','Bagamul','Bakh','Baronk','Bashag','Bazgulub','Bogakh','Borug','Both','Bugdul','Bugharz','Bugrash','Bugrol','Bumbub','Burul','Dul','Dular','Duluk','Duma','Dumbuk','Dumburz','Dur','Durbul','Durgash','Durz','Durzol','Durzub','Durzum','Garothmuk','Garzonk','Gashna','Ghamborz','Ghamonk','Ghoragdush','Ghorlorz','Glush','Grat','Guarg','Gurak','Khadba','Khagra','Khargol','Koffutto','Largakh','Lorbumol','Lorzub','Lugdum','Lugrub','Lurog','Mash','Matuk','Mauhul','Mazorn','Mol','Morbash','Mug','Mugdul','Muk','Murag','Murkub','Murzol','Muzgonk','Nag','Nar','Nash','Ogrul','Ogrumbu','Olfin','Olumba','Orakh','Rogdul','Shakh','Shamar','Shamob','Shargam','Sharkub','Shat','Shulong','Shura','Shurkul','Shuzug','Snaglak','Snakha','Snat','Ugdumph','Ughash','Ulam','Umug','Uram','Urim','Urul','Urzog','Ushamph','Yadba','Yagak','Yak','Yam','Yambagorn','Yambul','Yargol','Yashnarz','Yatur','Agronak','Bat','Bazur','Brugo','Bogrum','Brag','Brokil','Bugak','Buramog','Burz','Dubok','Dul','Dulfish','Dumag','Dulphumph','Gaturn','Gogron','Gorgo','Graklak','Graman','Grommok','Gul','Hanz','Krognak','Kurdan','Kurz','Rugdumph','Lum','Lumdum','Luronk','Magra','Magub','Maknok','Mug','Orok','Shagol','Shagrol','Shobob','Shum','Ulmug','Urbul','Urul','Ushnar','Uzul','Arob','Balogog','Borkul','Burguk','Dushnamub','Gat','Ghamorz','Ghorbash','Gradba','Grogmar','Grushnag','Gularzob','Kharag','Larek','Lob','Lurbuk','Mahk','Makhel','Abbas','Mauhulakh','Moth','Mul','Mulush','Nagrub','Oglub','Ogol','Olur','Ulag','Umurn','Urag','Yamarz','Yar'];
export const ORKS_PRENOMS_F: string[] = ['Agrob','Badbog','Bashuk','Bogdub','Bugdurash','Bula','Bulak','Bulfim','Bum','Burzob','Burub','Dura','Durgat','Durz','Gashnakh','Ghob','Glasha','Glob','Gluronk','Gonk','Grat','Grazob','Gulfim','Kharzug','Lagakh','Lambug','Lazgar','Mogak','Morn','Murob','Murzush','Nargol','Rolfish','Orbul','Ragash','Rulfim','Shadbak','Shagar','Shagdub','Sharn','Sharog','Shazgob','Shelur','Uloth','Ulumpha','Urzoth','Urzul','Ushat','Ushug','Yazgash','Batul','Borba','Bumph','Homraz','Rogbut','Mazoga','Mog','Mor','Oghash','Rogmesh','Snak','Ugak','Umog','Arob','Atub','Bagrak','Bolar','Bor','Borgakh','Dulug','Garakh','Ghak','Gharol','Ghorza','Gul','Lash','Murbol','Sharamph','Shel','Shufharz','Ugor','Urog','Yotul'];

export function rejoindreOrks(perso: PersoCommon): string {
    let texte: string = "Mais devenir un ork n'est pas si simple. Vous allez devoir boire le sérum de l'orkitude. "
    + "Il fera de vous un vrai Ork, si vous tenez le coup comme un vrai ork le ferait, bien sûr. <br/>";

    let scoreTransformation: number = Math.random();

    if (getValeurVertu(perso, Vertus.placide) > 0) {
        scoreTransformation += 0.04;
    }
    if (getValeurVertu(perso, Vertus.prudent) < 0) {
        scoreTransformation += 0.04;
    }
    if (getValeurVertu(perso, Vertus.sociable) > 0) {
        scoreTransformation += 0.04;
    }
    if (getValeurVertu(perso, Vertus.discipline) > 0) {
        scoreTransformation -= 0.04;
    }
    if (getValeurVice(perso, Vices.sociopathique) > 0) {
        scoreTransformation += 0.04;
    }
    if (getValeurVice(perso, Vices.paresseux) > 0) {
        scoreTransformation += 0.04;
    }
    if (getValeurVice(perso, Vices.aventureux) > 0) {
        scoreTransformation += 0.04;
    }
    if (getValeurCompetence(perso, TypeCompetence.force) > 35) {
        scoreTransformation += 0.05;
    } else  if (getValeurCompetence(perso, TypeCompetence.force) < 25) {
        scoreTransformation -= 0.03;
    }
    if (getValeurCompetence(perso, TypeCompetence.endurance) > 35) {
        scoreTransformation += 0.05;
    } else  if (getValeurCompetence(perso, TypeCompetence.endurance) < 25) {
        scoreTransformation -= 0.03;
    }
    if (getValeurCompetence(perso, TypeCompetence.bagarre) > 35) {
        scoreTransformation += 0.05;
    } else  if (getValeurCompetence(perso, TypeCompetence.bagarre) < 25) {
        scoreTransformation -= 0.03;
    }
    if (getValeurCompetence(perso, TypeCompetence.intuition) > 35) {
        scoreTransformation += 0.05;
    } else  if (getValeurCompetence(perso, TypeCompetence.intuition) < 25) {
        scoreTransformation -= 0.03;
    }
    if (getValeurCompetence(perso, TypeCompetence.intelligence) > 35) {
        scoreTransformation -= 0.03;
    } else  if (getValeurCompetence(perso, TypeCompetence.intelligence) < 25) {
        scoreTransformation += 0.05;
    }

    texte += "La transformation commence instantanément. Votre peau verdit, vos crocs poussent, tous vos cheveux tombent, vos yeux deviennent rouges. <br/>";

    const effet: EffectDeCoterieSurPerso = getEffetsDeCoterieSurCompetences(Coterie.orks);
    if (scoreTransformation < 0) {
        texte += "Malheureusement le résultat est catastrophique. Votre faible volonté ou juste la malchance font de vous un simple gretchin. Esclave pitoyable des ork que vous rêviez d'être.";

        texte += augmenterCompetence(perso, TypeCompetence.endurance, -5);
        texte += augmenterCompetence(perso, TypeCompetence.bagarre, -5);
        texte += augmenterCompetence(perso, TypeCompetence.force, -5);
        texte += augmenterCompetence(perso, TypeCompetence.intuition, 15);
        texte += augmenterCompetence(perso, TypeCompetence.charme, -5);
        // TODO : plus petite taille ?
    }
    else if (scoreTransformation > 1) {
        texte += "Le résultat dépasse toutes vos espérances. Vous devenez un gros et terrible nob. Un chef né tout en muscle à la mesure des orks.";
        effet.plus10Values.forEach((typeComp: TypeCompetence) =>
            texte += augmenterCompetence(perso, typeComp, 20)
        );
        effet.plus5Values.forEach((typeComp: TypeCompetence) =>
            texte += augmenterCompetence(perso, typeComp, 10)
        );
        effet.minus10Values.forEach((typeComp: TypeCompetence) =>
            texte += augmenterCompetence(perso, typeComp, -15)
        );
        effet.minus5Values.forEach((typeComp: TypeCompetence) =>
            texte += augmenterCompetence(perso, typeComp, -10)
        );
    } else {
        texte += "Cela marche à merveille. Vous sentez votre corps se renforcer, votre esprit se libérer. Vous êtes maintenant un ork !";
        texte = effetDeBaseEnRejoignantUneCoterie(effet, perso);
    }

    // guérison potentielle des blessures par l'orkitude :
    const texteBlessure = soignerBlessureAleatoire(perso);
    if (texteBlessure) {
        texte += "L'incroyable pouvoir de régénération du sérum d'orkitude régénère votre corps.";
        texte += texteBlessure;
    }

    perso.prenom = getPrenom(Coterie.orks, Sexe.male);
    texte += "Dorénavant vous vous appellerez " + perso.prenom + ".";
    perso.lieu.quartier = getQuartierDeCoterie(Coterie.orks);
    texte += "Vous vous installez dans le quartier des orks à " + perso.lieu.quartier + ".";

    return texte;
}