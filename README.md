# Angular : Projet final - Assignments
Repository où déposer le projet n°2 Angular

## Commentaires
Voici le lien de mon repository git que j'ai testé dans mon "Codespace" comme je n'ai pu le faire dans celui de votre repository pour vérifier :
https://github.com/dioprawane/MesTPsAngular.git

Puis pour ce qui concerne ce point : 
- [x] Gestion des droits :
  - Si on n'est pas logué on ne peut ni voir le détail, ni éditer
  
J'étais parti sur l'idée que si on n'est pas logé, on ne peut rien faire que voir les options possibles sans pouvoir y naviguer.
Et partout où on souhaite naviguer, un message de demande de connexion est affiché. Il faut se connecter pour découvrir les contenus.
Puis pour avoir les identifications, essayez de vous connecter avec n'importe quels identifiants et vous aurez en alerte les vrais login/password pour chaque rôle.

### DIOP :

### Serigne Rawane : 

## Fonctionnalités intégrées[^3]
- [x] Au moins 1000 assignments dans la base de données. 
- [x] Ajouter une gestion de login/password :
  - Vous ajouter dans la toolbar un formulaire login/password + bouton connexion. Une fois loggué, le formulaire disparait et seul un bouton de deconnexion apparait.
  - Si on est loggué en tant que user autorisé on a le droit de modifier / ajouter un assignment. Si on est loggué en admin on pourra en plus supprimer des assignments. Si on n'est pas loggué on ne peut que consulter.
  - Vous codez en dur dans le service d'authentification une liste de login/passwords valides.
- [x] Identification par **login/password**
  - ajouter un tableau de login/password/role (avec rôle qui est soit **user** soit **admin**) dans le service d'authentification
  - modifier le code pour avoir `isLogged()` **ET** `isAdmin()` au lieu de juste `isAdmin()`
- [x] Au lieu du slider `LogIn`, ajouter un bouton connecter (avec une *mat-icon* adaptée) qui amène à un composant avec un formulaire de connexion
- [x] Ajouter de nouvelles propriétés au modèle des Assignments
  - Auteur (nom de l'élève)
  - Matière (Base de données, Technologies Web, Grails, etc.)
  - Une image sera associée à chaque matière et une photo du prof
  - Note sur 20, on ne peut marquer "rendu" un Assignment qui n'a pas été noté.
  - Remarques sur l'assignment


[^1]: à remplir
[^2]: à remplir
[^3]: vous pouvez cocher les tâches qui ont été faites en utilisant la syntaxe `[x]` dans le markdown

# AssignmentApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
# AngularProjetAssignments
