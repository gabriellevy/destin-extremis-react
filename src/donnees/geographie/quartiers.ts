export enum Quartier {
    inconnu = 'Inconnu',

    // -------------- Europe
    // ---- La Ville
    noisiel = 'Noisiel',
    montmartre = 'Montmartre',
    saint_maur_des_fosses = 'Saint Maur des fossés',
    chatenay_malabry = 'Châtenay-Malabry',
    montbrison = 'Montbrison',
    saint_malo = 'Saint-Malo',
    montesson = 'Montesson',
    palais_royal = 'Palais royal',
    saint_germain_en_laye = 'Saint Germain en Laye',
    bois_de_boulogne = 'Bois de Boulogne',
    versailles = 'Versailles',
    vanves = 'Vanves',
    luxembourg = 'Luxembourg',
    la_defense = 'La Défense',
    bondy = 'Bondy',
    maisons_laffite = 'Maisons-Laffite',
    genevilliers = 'Genevilliers',
    saint_ouen = 'Saint Ouen',
    grande_crete = 'Grande crète',
    catacombes_de_paris = 'catacombes de Paris',
    saint_denis = 'Saint-Denis',
    argenteuil = 'Argenteuil',
    suresnes = 'Suresnes',
    // ---- Pyrénées
    pyrenees = 'Pyrénes',

    // Asie

    vladivostok = 'Vladivostok',
    comptoir_ghangzhou = 'Comptoir de Ghangzhou',
}

export function descriptionQuartier(quartier: Quartier): string {
    let texte: string = "Vous vous trouvez dans le quartier <b>" + quartier + "</b>.<br/>";
    switch (quartier) {
        case Quartier.grande_crete:
            texte += "La grande crête est une aberration géologique survenue durant la grande guerre tectonique. "
                + "À cette époque les chthoniens ont attaqué l’Europe en y provoquant une série de séismes qui ont eu pour principal effet la création d’une énorme chaîne de montagne entre Paris et Prague. "
                + "Cette crête a une altitude équivalente à celle des alpes mais est encore plus abrupte. <br/>"
                + "Elle est naturellement très difficile à aménager mais les schweizer l’ont trouvée à leur goût et l’ont transformée de manière si ingénieuse qu’elle est devenue prospère et très bien desservie par les chemins de fers, surtout dans la partie proche de la Ville. ";
            break;
            case Quartier.noisiel:
            texte += "Noisiel est un petit quartier réquisitionné par les <a href='https://www.notion.so/Ach-ron-acdb44a8711640f5a6d9527e5e656d5a?pvs=21'>Achéron</a> pour habiter le proche centre de la Ville et ainsi remplir les obligations légales pour être une coterie siégeant à l’assemblée. <br/>"
                + "Malheureusement leur influence a perverti le quartier et en a fait un lieu désolé et morbide où très peu d’Extrémiens viennent s’installer. <br/>"
                + "Ils voulaient augmenter leur influence politique mais l’exemple de leur gouvernance et de leur influence magique a au contraire fait d’eux un exemple à ne pas suivre pour tous ceux qui ont visité Noisiel. <br/>";
            break;
            case Quartier.genevilliers:
            texte += "Ce quartier est celui des <a href=https://www.notion.so/Orks-c92555dd3ea94318a030d7bb6cfe24ca?pvs=21>orks</a> et est par conséquent le plus bruyant et le plus pollué de la ville. Certains disent qu'il a la meilleur ambiance. C'est en tout cas assurément le quartier où l'espérance de vie est la plus courte. Car non seulement les orks sont violents mais ils sont aussi imprudents et distraits. Les accidents et explosions divers sont donc monnaie courante. Pire quand on a la malchance d'habiter près d'un mékano qui aime créer des appareils expérimentaux. <br/>"
                + "Et leurs médecins, habitués à la grande résistance des orks, sont de vrais bouchers quand ils tentent de soigner un humain normal. Le concept d’anesthésie leur est complètement étranger. <br/>"
                + "En conséquence la mixité est infime à Gennevilliers. Peu de non orks souhaitent vivre parmi des orks et ceux ci s’en acclimatent très bien. Ils reçoivent néanmoins beaucoup de visiteurs lors de leurs très nombreuses foires aux attractions aussi dangereuses que spectaculaires. <br/>";
            break;
        case Quartier.bois_de_boulogne:
            texte += "Le bois de Boulogne est le quartier de la coterie de l’Esprit de la nature et est donc en conséquence la partie la plus sauvage et arborée de La Ville. Un vrai miracle de verdure à deux pas de La défense. L’appeler “quartier” est généreux car les bâtiments y sont prohibés et le seul service municipal qui y est toléré est celui des ouvreurs de chemins qui taillent quelques routes et chemins dans la forêt qui autrement serait une jungle impénétrable. ";
            break;
        default:
            texte += "Il manque la description de cet endroit : " + quartier;
    }
    return texte;
}

export function imageQuartier(quartier: Quartier): string {
    switch (quartier) {
        case Quartier.bois_de_boulogne:
            return "https://raw.githubusercontent.com/gabriellevy/destin-extremis-react/refs/heads/main/images/quartiers/bois%20de%20boulogne.jpg";
        case Quartier.chatenay_malabry:
            return "https://raw.githubusercontent.com/gabriellevy/destin-extremis-react/refs/heads/main/images/quartiers/Ch%C3%A2tenay-Malabry.jpg";
        case Quartier.grande_crete:
            return "https://raw.githubusercontent.com/gabriellevy/destin-extremis-react/refs/heads/main/images/quartiers/grande_cr%C3%A8te.jpg";
        case Quartier.noisiel:
            return "https://github.com/gabriellevy/destin-extremis-react/blob/main/images/quartiers/noisiel.jpg?raw=true";
        case Quartier.genevilliers:
            return "https://raw.githubusercontent.com/gabriellevy/destin-extremis-react/refs/heads/main/images/quartiers/genevilliers.jpg";
        case Quartier.maisons_laffite:
            return "https://raw.githubusercontent.com/gabriellevy/destin-extremis-react/refs/heads/main/images/quartiers/Maisons-Laffite.jpg";
        case Quartier.saint_denis:
            return "https://raw.githubusercontent.com/gabriellevy/destin-extremis-react/refs/heads/main/images/quartiers/Saint-Denis.jpg";
        case Quartier.versailles:
            return "https://raw.githubusercontent.com/gabriellevy/destin-extremis-react/refs/heads/main/images/quartiers/versailles.jpg";

        default:
            console.error("Il manque l'image de cet endroit : " + quartier);
            return '';
    }
}
