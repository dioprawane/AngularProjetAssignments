import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})

export class AssignmentsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'nom', 'dateDeRendu', 'rendu', 'remarque', 'eleveNom', 'elevePrenom', 'note', 'nomMatiere', 'enseignant', 'imageProf', 'imageMatiere'];
  flatAssignments = new MatTableDataSource<any>(); // Utilisez MatTableDataSource
  @ViewChild(MatPaginator) paginator: MatPaginator;
  

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
      this.flatAssignments.paginator = this.paginator; // Lier le paginator ici
    });
  }

  flattenAssignments() {
    const flattenedData = [];
    this.assignments.forEach(assignment => {
      assignment.eleves.forEach(eleve => {
        flattenedData.push({
          id: assignment.id,
          nom: assignment.nom,
          dateDeRendu: assignment.dateDeRendu,
          rendu: assignment.rendu,
          remarque: assignment.remarque,
          eleveNom: eleve.nom,
          elevePrenom: eleve.prenom,
          note: eleve.note,
          nomMatiere: assignment.matiere.nom,
          enseignant: assignment.matiere.enseignant,
          imageProf: assignment.matiere.imageProf,
          imageMatiere: assignment.matiere.imageMatiere
        });
      });
    });
    this.flatAssignments.data = flattenedData;
    console.log("flattenedData : ", flattenedData);
  }

  ngAfterViewInit() {
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
