import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Matiere } from '../models/matiere.model';
import { matieres } from '../shared/matieres.data';

@Injectable({
  providedIn: 'root'
})

export class MatieresService {

  constructor(private http: HttpClient) { }

  url = "https://service1-projet-angular.onrender.com/api/matieres";

  peuplerBD(): Observable<Matiere[]> {
    const calls = matieres.map((matiere) => this.addMatiere(matiere));
    return forkJoin(calls); // forkJoin attend que toutes les requêtes soient résolues
  }

  getMatieres(): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(this.url);
  }

  addMatiere(matiere: Matiere): Observable<any> {
    return this.http.post<Matiere>(this.url, matiere);
  }

  updateMatiere(matiere: Matiere): Observable<any> {
    return this.http.put<Matiere>(this.url, matiere);
  }

  deleteMatiere(matiere: Matiere): Observable<any> {
    let deleteURI = this.url + "/" + matiere._id;
    return this.http.delete(deleteURI);
  }

  getMatiere(id: number): Observable<Matiere | undefined> {
    return this.http.get<Matiere>(this.url + "/" + id);
  }

}
