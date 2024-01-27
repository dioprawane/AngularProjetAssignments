export class Assignment {
    _id?: string;
    id!: number;
    nom!: string;
    dateDeRendu!: Date;
    rendu!: boolean;
    remarque!: string;
    eleves: Array<{
        idEleve: number,
        nom: string,
        prenom: string,
        note: number
    }>;
    matiere_idMatiere!: number;
    matiere_nom!: string;
    matiere_enseignant!: string;
    matiere_imageMatiere!: string;
    matiere_imageProf!: string;
    /*matiere: {
        idMatiere: number,
        nom: string,
        enseignant: string,
        imageMatiere: string,
        imageProf: string
    };*/
}