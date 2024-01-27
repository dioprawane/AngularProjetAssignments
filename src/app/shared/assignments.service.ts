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

  url = "https://service1-projet-angular.onrender.com/api/assignments";

  peuplerBD(): Observable<Assignment[]> {
    const calls = assignments.map((assignment) => this.addAssignment(assignment));
    return forkJoin(calls); // forkJoin attend que toutes les requêtes soient résolues
  }

  getAssignments(page: number = 1, pageSize: number = 50): Observable<Assignment[]> {
    // Préparer les paramètres de la requête HTTP pour la pagination
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(pageSize));

    // Appel GET avec les paramètres de pagination
    return this.http.get<Assignment[]>(this.url, { params: params });
  }

  addAssignment(assignment: Assignment): Observable<any> {
    //return of('Assignment ajouté');
    console.log("Dans addAssignment, avant post");
    console.log(assignment);
    return this.http.post<Assignment>(this.url, assignment);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    //return of('Assignment service : assignment modifié !');
    return this.http.put<Assignment>(this.url, assignment);
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    // return of('Assignment service : assignment supprimé !');
    let deleteURI = this.url + "/" + assignment._id;
    return this.http.delete(deleteURI);
  }

  getAssignmentbis(id: number): Observable<Assignment | undefined> {
    return this.http.get<Assignment>(this.url + "/" + id);
  }

  getAssignment(_id: { $oid: string }): Observable<Assignment | undefined> {
    // Extraire la valeur $oid de l'objet _id
    const id = _id.$oid;
  
    // Utiliser cette valeur dans l'URL de la requête
    return this.http.get<Assignment>(`${this.url}/${id}`);
  }
  

}