import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DetailAfficheAssignmentsComponent } from './detail-affiche-assignments/detail-affiche-assignments.component';


@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})

export class AssignmentsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nom', 'dateDeRendu', 'rendu', 'remarque', 'nomMatiere', 'enseignant', 'imageProf', 'imageMatiere', 'detail', 'edit'];
  flatAssignments: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  titre = "Formulaire d'ajout d'un devoir";
  ajoutActive = false;
  color = 'green';
  id="monParagraphe";
  originalAssignments: Assignment[] = [];
  assignments:Assignment[] = [];
  currentUser: any = null;
  afficheMessage: boolean = false;
  page: number = 1;
  pageSize: number = 1500; // Nombre d'éléments par page
  totalAssignments = 0; // Initialiser le nombre total d'assignments
  filterValue: string = 'all';
  r = '';
  
  assignmentSelectionne?:Assignment;

  constructor(
    private assignmentService:AssignmentsService, 
    private authService: AuthService, 
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef,
    private route: ActivatedRoute,
    private dialog: MatDialog) { 
      this.flatAssignments = new MatTableDataSource(this.assignments);
    }

  ngOnInit() {
    const assignmentId = this.route.snapshot.params['id'];
    //this.assignments = this.assignmentService.getAssignments();
    this.loadAssignments();
    this.getAssignments();
    this.authService.userObservable$.subscribe(user => {
      this.currentUser = user;
    });
    console.log("currentUser de app.components : ", this.currentUser);
  }

  ngAfterViewInit() {
    this.flatAssignments.paginator = this.paginator;
    this.flatAssignments.sort = this.sort;
    this.flatAssignments.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'nomMatiere': return item.matiere_nom;
        case 'enseignant': return item.matiere_enseignant;
        default: return item[property];
      }
    };

    this.sort.sortChange.subscribe(() => this.applySort());
  }

  getAssignment() {
    // Récupérer l'ID depuis l'URL et le convertir en nombre
    const id = +this.route.snapshot.params['id'];
    if (id) {
      this.assignmentService.getAssignment(id).subscribe(assignment => {
        this.assignmentSelectionne = assignment;
      }, error => {
        console.error('Erreur lors de la récupération de l\'assignment', error);
      });
    }
  }

  openDetailsPopup(assignment: any) {
    this.dialog.open(DetailAfficheAssignmentsComponent, {
      width: '80%',
      data: assignment
    });
  }

  applySort() {
    const data = this.flatAssignments.data.slice();
    if (!this.sort.active || this.sort.direction === '') {
      this.flatAssignments.data = data;
      return;
    }

    this.flatAssignments.data = data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'nomMatiere': return compare(a.matiere_nom, b.matiere_nom, isAsc);
        case 'enseignant': return compare(a.matiere_enseignant, b.matiere_enseignant, isAsc);
        default: return compare(a[this.sort.active], b[this.sort.active], isAsc);
        }
      });
    }

  getAssignments() {
    this.assignmentService.getAssignments(this.page, this.pageSize, this.filterValue, this.r).subscribe(data => {
      this.assignments = data.assignments;
      this.totalAssignments = data.total; // Mettre à jour le nombre total d'assignments
      this.flatAssignments.data = this.assignments;
      this.changeDetectorRefs.detectChanges();
    });
  }

  getDescription() {
    return 'Je suis un sous composant';
  }

  getColor(a: any) {
    if (a.rendu) return 'green';
    else return 'red';
  }

  onChangePage(event: PageEvent) {
    this.page = event.pageIndex + 1; // Page index commence à 0
    this.pageSize = event.pageSize;
    this.flatAssignments.paginator = this.paginator;
    this.getAssignments();
  }

  assignmentClique(a:Assignment) {
    this.assignmentSelectionne = a;
  }

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

  isConnected() : boolean {
    return this.authService.isConnected();
  }
  
  onClickEdit(assignment: Assignment) {
    this.assignmentSelectionne = assignment;
    if (this.assignmentSelectionne) {
      this.router.navigate(['/assignment', this.assignmentSelectionne.id, 'edit']);
    } else {
      console.error('Aucun assignment sélectionné');
      // Vous pouvez également afficher un message à l'utilisateur ici
    }
  }
  
  

  loadAssignments() {
    this.assignmentService.getAssignments(this.page, this.pageSize, this.filterValue, this.r).subscribe(data => {
      this.assignments = data.assignments;
      this.totalAssignments = data.total;
      this.flatAssignments.data = this.assignments;
      this.flatAssignments.paginator = this.paginator; 
      //// Assurez-vous que cette ligne est présente
      this.changeDetectorRefs.detectChanges();
      //this.getAssignments();
    });
}

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
