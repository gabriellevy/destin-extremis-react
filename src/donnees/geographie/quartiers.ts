export enum Quartier {
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
    switch (quartier) {
        /*case Ville.altdorf:
            return "Altdorf, la majestueuse capitale de l'Empire, se dresse fièrement au cœur du Vieux Monde de Warhammer. Surnommée la \"Cité des Sigmarites\", elle est le centre politique, religieux et culturel de l'Empire. Ses rues pavées et ses bâtiments imposants témoignent de son riche passé et de son importance stratégique. Le Grand Temple de Sigmar, un édifice monumental, domine la ville et attire des pèlerins de tout l'Empire. Les quartiers d'Altdorf sont variés, allant des somptueuses demeures des nobles aux ruelles étroites et animées des quartiers marchands.\n" +
                "<br>" +
                "La ville est également un carrefour commercial dynamique, où les marchands de toutes les provinces viennent échanger leurs biens. Le fleuve Reik, qui traverse Altdorf, est une artère vitale pour le commerce fluvial, reliant la ville à d'autres grandes cités comme Nuln et Marienburg. Malgré sa splendeur, Altdorf n'est pas épargnée par les intrigues politiques et les complots. Les grandes familles nobles y exercent une influence considérable, et les luttes de pouvoir sont monnaie courante. La présence de l'Empereur et de sa cour ajoute une dimension de prestige et de danger à la vie quotidienne de ses habitants."
       */
        default:
            return "Il manque la description de cet endroit : " + quartier;
    }
}
