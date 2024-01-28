import { Component } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list-assignments',
  templateUrl: './list-assignments.component.html',
  styleUrls: ['./list-assignments.component.css']
})
export class ListAssignmentsComponent {

  assignments:Assignment[] = [];
  afficheMessage: boolean = false;
  currentUser: any = null;
  selectedAssignment: Assignment | null = null;

  page: number = 1;
  pageSize: number = 10; // Nombre d'éléments par page
  totalAssignments = 0; // Initialiser le nombre total d'assignments
  filterValue: string = 'all';
  r = 'all';

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
  /*getAssignment() {
    const id = this.route.snapshot.paramMap.get('_id');
    if (id) {
      this.assignmentService.getAssignment({ $oid: id }).subscribe(assignment => {
        this.selectedAssignment = assignment;
      });
    }
  }*/

  /*getAssignment() {
    const id = this.route.snapshot.paramMap.get('_id');
    if (id) {
      // Assurez-vous que l'URL et les paramètres sont corrects
      this.assignmentService.getAssignment({ $oid: id }).subscribe(assignment => {
        this.selectedAssignment = assignment;
      }, error => {
        console.error('Erreur lors de la récupération de l\'assignment', error);
      });
    }
  }*/
  getAssignment() {
    // Récupérer l'ID depuis l'URL et le convertir en nombre
    const id = +this.route.snapshot.params['id'];
    if (id) {
      this.assignmentService.getAssignment(id).subscribe(assignment => {
        this.selectedAssignment = assignment;
      }, error => {
        console.error('Erreur lors de la récupération de l\'assignment', error);
      });
    }
  }
  
  

  /*getAssignments() {
    this.assignmentService.getAssignments().subscribe(assignments => this.assignments = assignments);
  }*/
  getAssignments() {
    // Utilisez les propriétés 'page' et 'pageSize' de votre composant
    this.assignmentService.getAssignments(this.page, this.pageSize, this.filterValue, this.r)
        .subscribe(data => {
            this.assignments = data.assignments; // Assurez-vous que cette ligne correspond à la structure de votre réponse
            this.totalAssignments = data.total; // Mettez à jour le nombre total si votre API le renvoie
        }, error => {
            console.error('Erreur lors de la récupération des assignments', error);
        });
  }

  getColor(a: any) {
    if (a.rendu) return 'green';
    else return 'red';
  }

  onChangePage(event: PageEvent) {
    this.page = event.pageIndex + 1; // La pagination commence généralement à 1, pas 0
    this.pageSize = event.pageSize;
    this.loadAssignments();
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
          this.router.navigate(['/list']);
      });
    }
  }
  
  onClickEdit() {
    this.router.navigate(['/assignment', this.selectedAssignment.id, 'edit'],
    {queryParams: {nom: this.selectedAssignment.nom}, fragment: 'edition'});
  }

  /*loadAssignments() {
    this.assignmentService.getAssignments(this.page, this.pageSize).subscribe(data => {
      this.assignments = data;
    }, error => {
      console.error('Erreur lors de la récupération des assignments', error);
    });
  }*/
  loadAssignments() {
    this.assignmentService.getAssignments(this.page, this.pageSize, this.filterValue, this.r).subscribe(data => {
      this.assignments = data.assignments;
      this.totalAssignments = data.total;
    }, error => {
      console.error('Erreur lors de la récupération des assignments', error);
    });
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
          this.router.navigate(['/list']);
        });

    // pour cacher le détail de l'assignment dans la page
    //this.assignmentTransmis = null;
  }

}
