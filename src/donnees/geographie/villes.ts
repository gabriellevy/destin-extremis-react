export enum Ville {
    rome = 'Rome',
    ostia = 'Ostia',
    tivoli = 'Tivoli',
    pompei = 'Pompéi',
    herculanum = 'Herculanum',
    neapolis = 'Neapolis',
    capua = 'Capua',
    florentia = 'Florentia',
    pisae = 'Pisae',
    luca = 'Luca',
    perusia = 'Perusia',
    asisium = 'Asisium',
    Parma = 'Parma',
    Ariminum = 'Ariminum',
    bononia = 'Bononia',
    Verona = 'Verona',
    Patavium = 'Patavium',
    Aquileia = 'Aquileia',
    Genua = 'Genua',
    Savo = 'Savo',
    AugustaTaurinorum = 'Augusta Taurinorum',
    AugustaPraetoria = 'Augusta Praetoria',
    Mediolanum = 'Mediolanum',
    Comum = 'Comum',
    Syracusae = 'Syracusae',
    Panormus = 'Panormus',
    Catana = 'Catana',
    Olbia = 'Olbia',
    Caralis = 'Caralis',
    Rhegium = 'Rhegium',
    Croton = 'Croton',
    Brundisium = 'Brundisium',
    Barium = 'Barium',
    Mateola = 'Mateola',
    Potentia = 'Potentia',
    Teate = 'Teate',
    CampusBassus = 'Campus Bassus',
    Aesernia = 'Aesernia',
    Amiternum = 'Amiternum',
}

export enum tailleVilles {
    petit_village = 1, // moins de 50 habitants
    village = 2, // => 200
    petite_ville = 3, // => 2000
    grande_ville = 4, // => 12000
    metropole = 5,
}

export function tailleVille(ville: Ville): tailleVilles {
    switch (ville) {

        /*case Ville.coeurDeLaForet:
            return tailleVilles.petit_village;*/

        /*case Ville.brockel:
        case Ville.mittelweg:
        case Ville.sotturn:
        case Ville.schoninghagen:
        case Ville.dunkelbild:
        case Ville.waldenhof:
        case Ville.heisenberg:
        case Ville.halstedt:
            return tailleVilles.village;*/

        /*case Ville.frederheim:
        case Ville.kutenholz:
        case Ville.delberz:
        case Ville.malstedt:
        case Ville.grubentreich:
            return tailleVilles.petite_ville;*/

        case Ville.ostia:
        case Ville.tivoli:
        case Ville.pompei:
        case Ville.herculanum:
        case Ville.capua:
        case Ville.florentia:
        case Ville.perusia:
        case Ville.asisium:
        case Ville.Ariminum:
        case Ville.Parma:
        case Ville.luca:
        case Ville.pisae:
        case Ville.neapolis:
        case Ville.bononia:
        case Ville.Verona:
        case Ville.Patavium:
        case Ville.Aquileia:
        case Ville.Genua:
        case Ville.Savo:
        case Ville.AugustaTaurinorum:
        case Ville.AugustaPraetoria:
        case Ville.Mediolanum:
        case Ville.Catana:
        case Ville.Caralis:
        case Ville.Olbia:
        case Ville.Panormus:
        case Ville.Syracusae:
        case Ville.Comum:
        case Ville.Croton:
        case Ville.Rhegium:
        case Ville.Barium:
        case Ville.Brundisium:
        case Ville.Potentia:
        case Ville.Mateola:
        case Ville.Amiternum:
        case Ville.Teate:
        case Ville.CampusBassus:
        case Ville.Aesernia:
            return tailleVilles.grande_ville;

        case Ville.rome:
            return tailleVilles.metropole;
    }
}

export function descriptionVille(ville: Ville) {
    switch (ville) {
        /*case Ville.altdorf:
            return "Altdorf, la majestueuse capitale de l'Empire, se dresse fièrement au cœur du Vieux Monde de Warhammer. Surnommée la \"Cité des Sigmarites\", elle est le centre politique, religieux et culturel de l'Empire. Ses rues pavées et ses bâtiments imposants témoignent de son riche passé et de son importance stratégique. Le Grand Temple de Sigmar, un édifice monumental, domine la ville et attire des pèlerins de tout l'Empire. Les quartiers d'Altdorf sont variés, allant des somptueuses demeures des nobles aux ruelles étroites et animées des quartiers marchands.\n" +
                "<br>" +
                "La ville est également un carrefour commercial dynamique, où les marchands de toutes les provinces viennent échanger leurs biens. Le fleuve Reik, qui traverse Altdorf, est une artère vitale pour le commerce fluvial, reliant la ville à d'autres grandes cités comme Nuln et Marienburg. Malgré sa splendeur, Altdorf n'est pas épargnée par les intrigues politiques et les complots. Les grandes familles nobles y exercent une influence considérable, et les luttes de pouvoir sont monnaie courante. La présence de l'Empereur et de sa cour ajoute une dimension de prestige et de danger à la vie quotidienne de ses habitants."
       */
        default:
            switch (tailleVille(ville)) {
                case tailleVilles.petit_village: return ville + " est un petit village.";
                case tailleVilles.village: return ville + " est un village.";
                case tailleVilles.petite_ville: return ville + " est une petite ville.";
                case tailleVilles.grande_ville: return ville + " est une grande ville.";
                case tailleVilles.metropole: return ville + " est un ville gigantesque.";
            }
    }
}
