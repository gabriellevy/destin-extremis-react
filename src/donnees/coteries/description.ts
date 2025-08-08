import {Coterie} from "../../types/Coterie";

export const descriptionCot: Record<Coterie, string> = {
    "Culte du plaisir": "",
    "Esprit de la nature": "",
    Aucune: "",
    [Coterie.bastets]: 'Principes de la faction : <br/>' +
    "- S'occuper des chats<br/>" +
    "- Mépris du travail<br/>" +
    "- individualisme forcené. Seuls la liberté et les chats comptent<br/>" +
    "- Apprendre à communiquer avec les chats pour mieux suivre leurs ordres<br/>" +
    "- Suivre le mode de vie des chats (dormir 20h par jour par exemple)",
    [Coterie.carthaginois]: "Les carthaginois sont l’incarnation de l’ambition et de l’aventure. Ils parcourent le monde par tous les moyens qui existent pour découvrir les terres et les peuples et commercer. Ils veulent tout posséder : toutes les matières, tous les métaux, tous les objets d’art, toutes les technologies, les accumuler puis s’en servir pour acquérir encore plus.",
    [Coterie.cathares]: "Les cathares nient l'existence de la volonté et affirment que seul Dieu accorde ses dons selon sa grâce. Lui demander une faveur pour soi est blasphématoire, seules les demandes désintéressées pour les autres ont une chance d'aboutir et elles ne doivent être faites qu'avec la plus grande humilité.",
    Celtes: "",
    Chaos: "",
    Conquistador: "",
    Démokratos: "",
    Elfes: "",
    Esthètes: "",
    Jacobins: "",
    Libertins: "",
    Lumières: "",
    Ogres: "",
    Orks: "",
    Performeurs: "",
    Romains: "",
    Saabi: "",
    Schweizer: "",
    Skavens: "",
    Templiers: "",
    Transhumanistes: "",
    Tyranides: "",
    Zaporogues: "",
    [Coterie.acheron] : "La coterie d'Achéron a un principe d'une terrifiante simplicité: la vie est surfaite. Il est temps que l'humanité dépasse ce stade et entre dans la non vie éternelle derrière le bienveillant guide qu'est la magie des ténèbres."
}