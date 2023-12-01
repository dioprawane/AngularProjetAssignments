import { Injectable } from '@angular/core';
import { Observable, lastValueFrom, of, forkJoin } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { assignments } from '../shared/data';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  constructor(private loggingService:LoggingService, private http:HttpClient) { }

  //url = "http://localhost:8010/api/assignments";
  url = "https://service1-projet-angular.onrender.com/api/assignments";

  /*peuplerBD(): Promise<any> {
    // Utilisez votre API pour envoyer les données à la base de données
    // Cela dépend de la façon dont votre backend est configuré
    return Promise.all(assignments.map(assignment => {
      return this.http.post<Assignment>(this.url, assignment);
      //return firstValueFrom(this.http.post('/api/assignments', assignment));
    }));
  }*/

  peuplerBD(): Observable<Assignment[]> {
    const calls = assignments.map((assignment) => this.addAssignment(assignment));
    return forkJoin(calls); // forkJoin attend que toutes les requêtes soient résolues
  }

  /*getAssignments():Observable<Assignment[]> {
    //return of (this.assignments);
    return this.http.get<Assignment[]>(this.url);
  }*/

  getAssignments(page: number = 1, pageSize: number = 50): Observable<Assignment[]> {
    // Préparer les paramètres de la requête HTTP pour la pagination
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(pageSize));

    // Appel GET avec les paramètres de pagination
    return this.http.get<Assignment[]>(this.url, { params: params });
  }

  addAssignment(assignment: Assignment): Observable<any> {
    //this.assignments.push(assignment);
    //this.loggingService.log(assignment?.nom, "ajouté");

    //return of('Assignment ajouté');
    return this.http.post<Assignment>(this.url, assignment);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    //return of('Assignment service : assignment modifié !');
    return this.http.put<Assignment>(this.url, assignment);
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    /*// position de l'assignment à supprimer, dans le tableau
    const pos = this.assignments.indexOf(a);

    // on le supprime avec ma méthode standard splice
    // sur les tableaux javascript. Elle prend en parametre
    // la position de l'élément à supprimer et le nombre d'éléments
    // à supprimer à partir de cette position
    this.assignments.splice(pos, 1);*/
    /*const index = this.assignments.indexOf(assignment, 0);
    if (index > -1) {
      this.assignments.splice(index, 1);
    }
    return of('Assignment service : assignment supprimé !');*/
    let deleteURI = this.url + "/" + assignment._id;
    return this.http.delete(deleteURI);
  }

  /*
  Fonction qui renvoie comme Observable l'assignment dont l'id est passé en paramètre
  ou undefined si l'assignment n'est pas trouvé
   */
  getAssignment(id: number): Observable<Assignment | undefined> {

    //const a:Assignment|undefined = this.assignments.find(a => a.id === id);
    //return of(a);
    return this.http.get<Assignment>(this.url + "/" + id);
  }

}
