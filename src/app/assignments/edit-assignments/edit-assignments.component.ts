import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-edit-assignments',
  templateUrl: './edit-assignments.component.html',
  styleUrls: ['./edit-assignments.component.css']
})
export class EditAssignmentsComponent implements OnInit {

  assignment!:Assignment | undefined;
  nomAssignment!: string;
  dateDeRendu!: Date;
  remarque!: string;

  //source: string = 'list';  // valeur par défaut

  constructor(private assignmentsService:AssignmentsService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAssignment();
    //Affichage des queryParams et fragment
    console.log("Query Params : ");
    console.log(this.route.snapshot.queryParams);
    console.log("Fragment : ");
    console.log(this.route.snapshot.fragment);
  }

  /*getAssignment() {
    // on récupère l'id dans le snapshot passé par le routeur
    // le "+" force l'id de type string en "number"
    const id = +this.route.snapshot.params['_id'];
   
    this.assignmentsService.getAssignment('_id').subscribe((assignment) => {
      if (!assignment) return;
      this.assignment = assignment;
      // Pour pré-remplir le formulaire
      this.nomAssignment = assignment.nom;
      this.dateDeRendu = assignment.dateDeRendu;
    });
  }*/
  /*getAssignment() {
    // Récupération de l'ID en tant que string
    const id = this.route.snapshot.paramMap.get('_id');
    if (id) {
      this.assignmentsService.getAssignment({ $oid: id }).subscribe((assignment) => {
        if (!assignment) return;
        this.assignment = assignment;
        this.nomAssignment = assignment.nom;
        this.dateDeRendu = assignment.dateDeRendu;
      });
    }
  }*/
  getAssignment() {
    // Récupérer l'ID depuis l'URL et le convertir en nombre
    const id = +this.route.snapshot.params['id'];
    if (id) {
      this.assignmentsService.getAssignment(id).subscribe((assignment) => {
        if (!assignment) {
          console.error('Assignment introuvable');
          return;
        }
        this.assignment = assignment;
        this.nomAssignment = assignment.nom;
        this.dateDeRendu = new Date(assignment.dateDeRendu);
        this.remarque = assignment.remarque;
      }, error => {
        console.error('Erreur lors de la récupération de l\'assignment', error);
      });
    }
  }
  


  onSaveAssignment() {
    if (!this.assignment) return;
 
    // on récupère les valeurs dans le formulaire
    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.remarque = this.remarque;
    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((message) => {
        console.log(message);
 
        // navigation vers la home page
        this.router.navigate(['/list']);
      });
  }

}
