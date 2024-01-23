import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})

export class AssignmentsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nom', 'dateDeRendu', 'rendu', 'remarque', 'idEleve', 'eleveNom', 'elevePrenom', 'note', 'idMatiere', 'nomMatiere', 'enseignant', 'imageProf', 'imageMatiere'];
  flatAssignments: any[] = []; // Cette structure contiendra vos données aplatie

  titre = "Formulaire d'ajout d'un devoir";
  ajoutActive = false;
  color = 'green';
  id="monParagraphe";
  assignments:Assignment[] = [];
  currentUser: any = null;
  afficheMessage: boolean = false;
  
  assignmentSelectionne?:Assignment;

  constructor(private assignmentService:AssignmentsService, private authService: AuthService, private router: Router) { } 

  ngOnInit() {
    //this.assignments = this.assignmentService.getAssignments();
    this.getAssignments();
    this.authService.userObservable$.subscribe(user => {
      this.currentUser = user;
    });
    console.log("currentUser de app.components : ", this.currentUser);
  }

  getAssignments() {
    this.assignmentService.getAssignments().subscribe(assignments => {
      this.assignments = assignments;
      this.flattenAssignments();
    });
  }

  flattenAssignments() {
    this.flatAssignments = [];
    this.assignments.forEach(assignment => {
      assignment.eleves.forEach(eleve => {
        this.flatAssignments.push({
          id: assignment.id,
          nom: assignment.nom,
          dateDeRendu: assignment.dateDeRendu,
          rendu: assignment.rendu,
          remarque: assignment.remarque,
          idEleve: eleve.idEleve, // Assurez-vous que c'est idEleve et non id
          eleveNom: eleve.nom,
          elevePrenom: eleve.prenom,
          note: eleve.note,
          idMatiere: assignment.matiere.idMatiere,
          nomMatiere: assignment.matiere.nom,
          enseignant: assignment.matiere.enseignant,
          imageProf: assignment.matiere.imageProf,
          imageMatiere: assignment.matiere.imageMatiere
        });
      });
    });
  }
  

  getDescription() {
    return 'Je suis un sous composant';
  }

  getColor(a: any) {
    if (a.rendu) return 'green';
    else return 'red';
  }


  assignmentClique(a:Assignment) {
    this.assignmentSelectionne = a;
  }

  /*onAddAssignmentBtnClick() {
    //this.formVisible = true;
  }*/

  /*onNouvelAssignment(event:Assignment) {
    //this.assignments.push(event);
    this.assignmentService.addAssignment(event).subscribe(message => console.log(message));

    this.formVisible = false;
  }*/

  doNothing() {
    console.log("doNothing");
  }

  onDeleteAssignment(a:Assignment) {
    this.assignmentService.deleteAssignment(a).subscribe(message => console.log(message));
  }

  navigateTo(route: string) {
    if(this.currentUser!=null) {
      this.router.navigate([route]);
      this.afficheMessage = false;
    } else {
      this.router.navigate([route]);
    }
  }

  


}
