import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Mon application Angular sur les assignments !';
  nomProf = 'Michel Buffa';
  x = 3;
  opened = true;

  afficheButton: boolean = false;

  drawer: any;

  constructor(private authService:AuthService, private router: Router, private assignmentService:AssignmentsService, private changeDetector: ChangeDetectorRef) {}

  currentUser: any = null;

  afficheMessage: boolean = false;

  ngOnInit() {
    this.authService.userObservable$.subscribe(user => {
      this.currentUser = user;
    });
    console.log("currentUser de app.components : ", this.currentUser);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Définit afficheButton et déclenche la détection des changements manuellement
      this.afficheButton = event.url === '/';
      console.log("button : ", this.afficheButton);
      this.changeDetector.detectChanges(); // déclenche manuellement la détection des changements
    });
    
  }


  peuplerBD() {
    this.assignmentService.peuplerBD().subscribe({
      next: (results) => {
        console.log('Base de données peuplée !', results);
        window.location.reload();
      },
      error: (error) => {
        console.error('Erreur lors du peuplement de la base de données', error);
      }
    });
  }

  doSomething() {
    // Charge la page "/list-devoirs"
    console.log("doSomething");
    //this.router.navigate(['/list-devoirs']);
  }

  navigateTo(route: string) {
    if(this.currentUser!=null) {
      this.router.navigate([route]);
      this.afficheMessage = false;
    } else {
      this.router.navigate(['/home']);
      this.afficheMessage = true;
    }
  }

  logOut() {
    this.authService.logOut();
    this.currentUser = null;
    this.router.navigate(['/login']); // Redirigez vers la page d'accueil après la déconnexion.
  }

  // Cette méthode détermine si l'URL actuelle est la page d'accueil
  isHomePage(): boolean {
    //this.afficheButton = true;
    return this.router.url === '/';
  }
  

}

