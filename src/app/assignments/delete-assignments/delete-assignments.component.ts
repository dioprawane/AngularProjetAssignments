import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-delete-assignments',
  templateUrl: './delete-assignments.component.html',
  styleUrls: ['./delete-assignments.component.css']
})
export class DeleteAssignmentsComponent implements OnInit {

  @Output() deleteAssignment = new EventEmitter<Assignment>();
  //@Input() assignmentDelete: Assignment | undefined;

  assignments:Assignment[] = [];
  afficheMessage: boolean = false;
  currentUser: any = null;
  assignmentTransmis?: Assignment;

  page: number = 1;
  pageSize: number = 10; // Nombre d'éléments par page
  totalAssignments = 500; // Nombre total d'éléments à paginer
  
  selectedAssignment: Assignment | null = null;

  constructor(
    private assignmentService: AssignmentsService, 
    private authService: AuthService, 
    private router:Router,
    private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['_id'];
      if (id) {
        this.getAssignment();
      }
    });
    this.loadAssignments();
    this.getAssignments();
    this.authService.userObservable$.subscribe(user => { 
      this.currentUser = user;

      // Vérifier si l'utilisateur est connecté
      if(!this.currentUser) {
        this.router.navigate(['/home']);
      }
    });
  }

  //Recuperer de assignments.component.ts
  /*getAssignment() {
    const id = +this.route.snapshot.params['_id'];
    this.assignmentService.getAssignment('_id').subscribe(assignment => this.selectedAssignment = assignment);
  }*/

  getAssignment() {
    const id = this.route.snapshot.paramMap.get('_id');
    if (id) {
      this.assignmentService.getAssignment({ $oid: id }).subscribe(assignment => {
        this.selectedAssignment = assignment;
      });
    }
  }

  getAssignments() {
    this.assignmentService.getAssignments().subscribe(assignments => this.assignments = assignments);
  }

  getColor(a: any) {
    if (a.rendu) return 'green';
    else return 'red';
  }


  onAssignmentClicked(a: Assignment) {
    this.selectedAssignment = a;
  }

  onDeleteAssignment() {
    // ici on doit le supprimer de la liste des assignments
    // soucis : la liste n'est pas là mais dans le composant parent
    // on va donc envoyer un message au parent pour lui dire de supprimer
    // l'assignment de la liste. Cet assignment est égal à this.assignmentTransmis
    this.assignmentService.deleteAssignment(this.selectedAssignment)
        .subscribe(message => {
          console.log(message);
          // Recharger la page pour afficher la liste des assignments
          location.reload();
          this.router.navigate(['/delete']);
        });

    // pour cacher le détail de l'assignment dans la page
    //this.assignmentTransmis = null;
  }
  
  isAdmin() : boolean {
    return this.authService.isAdmin();
  }

  loadAssignments() {
    this.assignmentService.getAssignments(this.page, this.pageSize).subscribe(data => {
      this.assignments = data;
    }, error => {
      console.error('Erreur lors de la récupération des assignments', error);
    });
  }

}
