import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  //injection par prograùmmation (au lieu de le faire dans le constructeur d'un composant)
  let authService = inject(AuthService);
  let router = inject(Router);

  // si ça renvoie true, alors on peut activer la route
  /*return authService.isAdmin().then(authentifie => {
    if (authentifie) {
      console.log("Vous êtes admin, navigation autorisée !");
      return true;
    } else {
      console.log("Vous n'êtes pas admin, navigation refusée  !");
      router.navigate(['/list']);
      return false;
    }
  });*/


  if (authService.isLogged() && authService.isAdmin()) {
    console.log("Vous êtes admin, navigation autorisée !");
    return true;
  } else if (authService.isLogged() && !authService.isAdmin())  {
    console.log("Vous n'êtes pas admin, navigation autorisée en consultation/Modification et Ajout !");
    return true;
  } else {
    console.log("Vous n'êtes pas connecté !");
    alert("Vous devez vous connecter pour accéder à cette page.\nIdentifiants de connexion :\n- Admin : login : admin, mot de passe : passwordAdmin\n- User : login : user1, mot de passe : password1");
    router.navigate(['/list']);
    return false;
  }

};