export enum Quartier {
    inconnu = 'Inconnu',

    noisiel = 'Noisiel',
    montmartre = 'Montmartre',
    saint_maur_des_fosses = 'Saint Maur des fossés',
    chatenay_malabry = 'Châtenay-Malabry',
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

    vladivostok = 'Vladivostok',
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
        default:
            texte += "Il manque la description de cet endroit : " + quartier;
    }
    return texte;
}

export function imageQuartier(quartier: Quartier): string {
    switch (quartier) {
        case Quartier.grande_crete:
            return "https://raw.githubusercontent.com/gabriellevy/destin-extremis-react/refs/heads/main/images/quartiers/grande_cr%C3%A8te.jpg";

        default:
            return "Il manque l'image de cet endroit : " + quartier;
    }
}
