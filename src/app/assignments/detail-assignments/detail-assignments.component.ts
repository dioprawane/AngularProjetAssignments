import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from '../assignment.model';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-detail-assignments',
  templateUrl: './detail-assignments.component.html',
  styleUrls: ['./detail-assignments.component.css']
})
export class DetailAssignmentsComponent implements OnInit {
  assignmentTransmis?: Assignment;
  @Output() deleteAssignment = new EventEmitter<Assignment>();
  currentUser: any = null;

  constructor(
    private assignmentsService: AssignmentsService, 
    private router: Router, 
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['_id'];
      if (id) {
        this.getAssignment();
      }
    });
    this.authService.userObservable$.subscribe(user => {
      this.currentUser = user;
    });
  }

  /*getAssignment() {
    const id = this.route.snapshot.paramMap.get('_id');
    if (id) {
      this.assignmentsService.getAssignment({ $oid: id }).subscribe(
        assignment => {
          this.assignmentTransmis = assignment;
        },
        error => {
          console.error('Erreur lors de la récupération de l\'assignment:', error);
        }
      );
    }
  }*/
  getAssignment() {
    // Récupérer l'ID depuis l'URL et le convertir en nombre
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const idNumber = +id; // Le symbole '+' convertit la chaîne en nombre
      this.assignmentsService.getAssignment(idNumber).subscribe(assignment => {
        this.assignmentTransmis = assignment;
      }, error => {
        console.error('Erreur lors de la récupération de l\'assignment', error);
      });
    }
  }
  
    

  onDeleteAssignment() {
    // ici on doit le supprimer de la liste des assignments
    // soucis : la liste n'est pas là mais dans le composant parent
    // on va donc envoyer un message au parent pour lui dire de supprimer
    // l'assignment de la liste. Cet assignment est égal à this.assignmentTransmis
    this.assignmentsService.deleteAssignment(this.assignmentTransmis)
        .subscribe(message => {
          console.log(message);
          this.router.navigate(['/list']);
        });

    // pour cacher le détail de l'assignment dans la page
    //this.assignmentTransmis = null;
  }

// Vérifier si l'utilisateur est connecté
onAssignmentRendu() {
  if(this.currentUser != null) { 
    if (this.assignmentTransmis) {
      this.assignmentTransmis.rendu = true;

      this.assignmentsService.updateAssignment(this.assignmentTransmis).subscribe((message) => {
          console.log(message);
          // Naviguer vers "/list" une fois la mise à jour effectuée
          this.router.navigate(['/list']);
      });
    }
  }
}

onClickEdit() {
  this.router.navigate(['/assignment', this.assignmentTransmis._id, 'edit'],
  {queryParams: {nom: this.assignmentTransmis.nom}, fragment: 'edition'});
}

isAdmin() : boolean {
  return this.authService.isAdmin();
}

isConnected() : boolean {
  return this.authService.isConnected();
}

}
