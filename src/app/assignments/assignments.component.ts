import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})

export class AssignmentsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'nom', 'dateDeRendu', 'rendu', 'remarque', 'nomMatiere', 'enseignant', 'imageProf', 'imageMatiere'];
  flatAssignments = new MatTableDataSource<any>(); // Utilisez MatTableDataSource
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
  
  assignmentSelectionne?:Assignment;

  constructor(
    private assignmentService:AssignmentsService, 
    private authService: AuthService, 
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef) { } 

  ngOnInit() {
    //this.assignments = this.assignmentService.getAssignments();
    this.getAssignments();
    this.authService.userObservable$.subscribe(user => {
      this.currentUser = user;
    });
    console.log("currentUser de app.components : ", this.currentUser);
  }

  ngAfterViewInit() {
    this.flatAssignments.sort = this.sort;
    this.flatAssignments.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'nomMatiere': return item.matiere.nom;
        case 'enseignant': return item.matiere.enseignant;
        default: return item[property];
      }
    };

    this.sort.sortChange.subscribe(() => this.applySort());
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
        case 'nomMatiere': return compare(a.matiere.nom, b.matiere.nom, isAsc);
        case 'enseignant': return compare(a.matiere.enseignant, b.matiere.enseignant, isAsc);
        default: return compare(a[this.sort.active], b[this.sort.active], isAsc);
        }
      });
    }

  getAssignments() {
    this.assignmentService.getAssignments().subscribe(assignments => {
      this.assignments = assignments;
      this.originalAssignments = assignments;
      this.flatAssignments.data = assignments;
      this.flatAssignments.paginator = this.paginator;
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

  /*toggleRendu(event: MatCheckboxChange) {
    if (event.checked) {
      this.flatAssignments.data = this.flatAssignments.data.filter(a => a.rendu);
    } else {
      this.getAssignments(); // ou utilisez une copie originale des données
    }
    this.changeDetectorRefs.detectChanges(); // Informe Angular d'un changement
  }*/

  applyFilter(filterValue: string) {
    switch (filterValue) {
      case 'all':
        this.flatAssignments.data = [...this.originalAssignments]; // Réinitialiser avec les données originales
        break;
      case 'rendu':
      case 'nonRendu':
        const isRendu = filterValue === 'rendu';
        this.flatAssignments.data = this.originalAssignments.filter(a => a.rendu === isRendu);
        break;
    }
    this.changeDetectorRefs.detectChanges(); // Informer Angular du changement
  }

  onSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.applySearch(input.value);
  }

  // Méthode pour filtrer les assignments
  applySearch(searchValue: string) {
    let filteredAssignments: Assignment[];
    if (!searchValue) {
      filteredAssignments = this.originalAssignments; // Assurez-vous que 'originalAssignments' est bien de type Assignment[]
    } else {
      filteredAssignments = this.originalAssignments.filter(assignment =>
        assignment.nom.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    // Conversion en MatTableDataSource
    this.flatAssignments = new MatTableDataSource(filteredAssignments);
  }

  
}

function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
