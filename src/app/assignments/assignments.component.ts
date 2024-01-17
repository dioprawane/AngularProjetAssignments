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
    this.assignmentService.getAssignments().subscribe(assignments => this.assignments = assignments);
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
