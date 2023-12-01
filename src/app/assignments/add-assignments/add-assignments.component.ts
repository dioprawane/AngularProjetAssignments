import { Component, OnInit /*EventEmitter, Output*/ } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-add-assignments',
  templateUrl: './add-assignments.component.html',
  styleUrls: ['./add-assignments.component.css']
})
export class AddAssignmentsComponent implements OnInit {
  // Evenement qu'on enverra au père avec la soumission
  // du formulaire
  //@Output() nouvelAssignment = new EventEmitter<Assignment>();

  // pour le formulaire
  nomDevoir:string="";
  dateRendu:Date;
  afficheMessage: boolean = false;
  currentUser: any = null;

  constructor(private assignmentsService:AssignmentsService, private authService: AuthService , private router:Router) { }

  ngOnInit(): void {
    this.authService.userObservable$.subscribe(user => {
      this.currentUser = user;

      // Vérifier si l'utilisateur est connecté
      if(!this.currentUser) {
        this.router.navigate(['/home']);
      }
    });
    
  }

  onSubmit(event:any) {
    const newAssignment = new Assignment();
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateRendu;
    newAssignment.rendu = false;
    newAssignment.id = Math.floor(Math.random() * 1000) + 1;

    this.assignmentsService.addAssignment(newAssignment)
        .subscribe(message => 
          console.log(message));
          this.router.navigate(['list']);

  }

}