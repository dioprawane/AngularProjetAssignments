import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Eleve } from '../models/eleve.model';
import { eleves } from '../shared/eleves.data';

@Injectable({
  providedIn: 'root'
})

export class ElevesService {

  constructor(private http: HttpClient) { }

  private url = "https://service1-projet-angular.onrender.com/api/eleves";
  //private url = "http://localhost:8010/api/eleves";

  peuplerBD(): Observable<Eleve[]> {
    const calls = eleves.map((eleve) => this.addEleve(eleve));
    return forkJoin(calls); // forkJoin attend que toutes les requêtes soient résolues
  }

  getEleves(): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(this.url);
  }

  addEleve(eleve: Eleve): Observable<any> {
    return this.http.post<Eleve>(this.url, eleve);
  }

  updateEleve(eleve: Eleve): Observable<any> {
    return this.http.put<Eleve>(this.url, eleve);
  }

  deleteEleve(eleve: Eleve): Observable<any> {
    let deleteURI = this.url + "/" + eleve._id;
    return this.http.delete(deleteURI);
  }

  getEleve(id: number): Observable<Eleve | undefined> {
    return this.http.get<Eleve>(this.url + "/" + id);
  }

}
