import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userLogin: string = '';
  userPassword: string = '';

  currentUsers: any = null;

  constructor(private authService:AuthService , private router: Router) {}

  onLoginSubmit(): void {
    if (this.authService.authenticate(this.userLogin, this.userPassword)) {
      this.currentUsers = this.authService.getCurrentUser();
      // redirection vers la page d'accueil ou une autre page après la connexion réussie
      this.router.navigate(['/home']);
    } else {
      alert("Login ou mot de passe incorrect ! \nVous devez vous connecter pour accéder aux autres pages/fonctionnalités.\nIdentifiants de connexion :\n- Admin : login : admin, mot de passe : passwordAdmin\n- User : login : user1, mot de passe : password1");
    }
  }
  
}
