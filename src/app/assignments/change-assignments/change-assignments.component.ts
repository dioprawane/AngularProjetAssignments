import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-change-assignments',
  templateUrl: './change-assignments.component.html',
  styleUrls: ['./change-assignments.component.css']
})
export class ChangeAssignmentsComponent {

  assignments:Assignment[] = [];
  afficheMessage: boolean = false;
  currentUser: any = null;
  selectedAssignment: Assignment | null = null;

  page: number = 1;
  pageSize: number = 10; // Nombre d'éléments par page
  totalAssignments = 500; // Nombre total d'éléments à paginer



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
    this.authService.userObservable$.subscribe(user => {
      this.currentUser = user;

      // Vérifier si l'utilisateur est connecté
      if(!this.currentUser) {
        this.router.navigate(['/home']);
      }
    });
  }

  //Recuperer de assignments.component.ts
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
  
  
  isAdmin() : boolean {
    return this.authService.isAdmin();
  }

  isConnected() : boolean {
    return this.authService.isConnected();
  }

  onAssignmentRendu() {
    if (this.selectedAssignment) {
      this.selectedAssignment.rendu = true;
      console.log("onAssignmentRendu : ", this.selectedAssignment);
  
      this.assignmentService.updateAssignment(this.selectedAssignment).subscribe((message) => {
          console.log(message);
          // Naviguer vers "/list" une fois la mise à jour effectuée
          this.router.navigate(['/change']);
      });
    }
  }
  
  onClickEdit() {
    this.router.navigate(['/assignment', this.selectedAssignment.id, 'edit'],
    {queryParams: {nom: this.selectedAssignment.nom}, fragment: 'edition'});
  }

  loadAssignments() {
    this.assignmentService.getAssignments(this.page, this.pageSize).subscribe(data => {
      this.assignments = data;
    }, error => {
      console.error('Erreur lors de la récupération des assignments', error);
    });
  }

}
