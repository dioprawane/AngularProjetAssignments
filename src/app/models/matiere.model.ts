import { Assignment } from "../assignments/assignment.model";
import { Eleve } from "./eleve.model";

export class Matiere {
    _id?: string;
    idMatiere!: number;
    nom!: string;
    enseignant!: Date;
    imageMatiere!: string;
    imageProf!: string;
    assignments: Assignment[];
    eleves: Eleve[];
}