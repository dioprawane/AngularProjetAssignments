import { Component, OnInit, ViewChild /*EventEmitter, Output*/ } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { IdService } from 'src/app/shared/id.service';

@Component({
  selector: 'app-add-assignments',
  templateUrl: './add-assignments.component.html',
  styleUrls: ['./add-assignments.component.css']
})
export class AddAssignmentsComponent implements OnInit {
  // Evenement qu'on enverra au père avec la soumission
  // du formulaire
  //@Output() nouvelAssignment = new EventEmitter<Assignment>();
  assignmentForm: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  @ViewChild('stepper') stepper: MatStepper;

  // pour le formulaire
  nomDevoir:string="";
  dateRendu:Date;
  //remarque:string="";
 // matiere:any; // Pour la liste déroulante
  afficheMessage: boolean = false;
  currentUser: any = null;
  private dernierId = 1000; // Valeur de départ pour les IDs
  enCoursDeSoumission: boolean = false;
  matieres = [
    {"idMatiere": 1, "nom": "IA pour le Web", "enseignant": "M. Winter", "imageMatiere": "../../assets/ia.png", "imageProf": "assets/Winter.png"},
    {"idMatiere": 2, "nom": "Javascript et HTML", "enseignant": "M. Buffa", "imageMatiere": "../../assets/html.png", "imageProf": "assets/Michel-Buffa.jpg"},
    {"idMatiere": 3, "nom": "Fonctionnement des SGBD", "enseignant": "M. Galli", "imageMatiere": "../../assets/bdd.png", "imageProf": "assets/gali.jpg"},
    {"idMatiere": 4, "nom": "Stratégie d’entreprise", "enseignant": "M. Tounsi", "imageMatiere": "../../assets/management.png", "imageProf": "assets/Tounsi.jpg"},
    {"idMatiere": 5, "nom": "Mathématiques pour le Big Data", "enseignant": "M. Donati", "imageMatiere": "../../assets/axe.png", "imageProf": "assets/Donati.jpg"},
    {"idMatiere": 6, "nom": "Analyse Financière", "enseignant": "M. Anigo", "imageMatiere": "../../assets/analyse.png", "imageProf": "assets/prof.png"},
    {"idMatiere": 7, "nom": "Planification de projet", "enseignant": "M. Crescenzo", "imageMatiere": "../../assets/projet.png", "imageProf": "assets/Crescenzo.jpg"},
    {"idMatiere": 8, "nom": "Programmation avancée", "enseignant": "M. Lahire", "imageMatiere": "../../assets/avancee.png", "imageProf": "assets/Lahire.jpg"},
    {"idMatiere": 9, "nom": "Recueil des exigences", "enseignant": "Mme Mirbel", "imageMatiere": "../../assets/gestionProjet.png", "imageProf": "assets/Mirbel.jpg"},
    {"idMatiere": 10, "nom": "Bases de données pour le Big Data", "enseignant": "M. Syska", "imageMatiere": "../../assets/bddBigData.png", "imageProf": "assets/Syska.jpg"},
    {"idMatiere": 11, "nom": "Communication for business", "enseignant": "M. Arnault", "imageMatiere": "../../assets/rassembler.png", "imageProf": "assets/Frederic_Arnault.jpg"}
];

  constructor(
    private assignmentsService:AssignmentsService, 
    private authService: AuthService , 
    private router:Router,
    private _formBuilder: FormBuilder,
    private idService: IdService
    ) { }

  ngOnInit(): void {
    this.authService.userObservable$.subscribe(user => {
      this.currentUser = user;

      // Vérifier si l'utilisateur est connecté
      if(!this.currentUser) {
        this.router.navigate(['/home']);
      }
    });

    this.firstFormGroup = this._formBuilder.group({
      nomDevoir: ['', Validators.required], // Ajout du validateur 'required'
      remarque: [''],
      matiere: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      dateRendu: ['']
    });

    // Si vous avez d'autres groupes, initialisez-les ici
    this.assignmentForm = this._formBuilder.group({
      firstFormGroup: this.firstFormGroup,
      secondFormGroup: this.secondFormGroup
      // Autres groupes
    });
    
  }


  onSubmit() {
    if (this.assignmentForm.invalid || this.enCoursDeSoumission) {
      //alert("Le nom du devoir est obligatoire !");
      return; // Arrêter la soumission si le formulaire est invalide
    }
    this.enCoursDeSoumission = true; // Début de la soumission

    const selectedMatiereId = this.firstFormGroup.get('matiere').value;
    const selectedMatiere = this.matieres.find(m => m.idMatiere === selectedMatiereId);

    this.dernierId++; // Incrémenter le dernier ID utilisé
    const newAssignment2 = new Assignment();
    newAssignment2.id = this.idService.obtenirProchainId();
    newAssignment2.nom = this.firstFormGroup.get('nomDevoir').value;
    newAssignment2.dateDeRendu = this.secondFormGroup.get('dateRendu').value;
    newAssignment2.rendu = false;
    newAssignment2.remarque = this.firstFormGroup.get('remarque').value;
    newAssignment2.eleves = [];
    newAssignment2.matiere_idMatiere = selectedMatiere.idMatiere;
    newAssignment2.matiere_nom = selectedMatiere.nom;
    newAssignment2.matiere_enseignant = selectedMatiere.enseignant;
    newAssignment2.matiere_imageMatiere = selectedMatiere.imageMatiere;
    newAssignment2.matiere_imageProf = selectedMatiere.imageProf;
  
    this.assignmentsService.addAssignment(newAssignment2)
        .subscribe(message => {
          console.log(message);
          this.resetForm();
          this.enCoursDeSoumission = false;
          this.router.navigate(['list']);
        });
        console.log("newAssignment : ", newAssignment2);
        console.log("selectedMatiere : ", selectedMatiere);
  }
  
  resetForm() {
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.stepper.reset();
  }

}