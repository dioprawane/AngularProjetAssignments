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
export class MatieresService {

  constructor(private loggingService:LoggingService, private http:HttpClient) { }

  url = "https://service1-projet-angular.onrender.com/api/assignments";
}
