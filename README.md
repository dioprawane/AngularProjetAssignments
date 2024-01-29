# Gestionnaire d'Assignments avec Angular : Projet final - Assignments

Notre application a été déployé et est disponible sur : https://service2222-projet-angular-front-end.onrender.com

## Présentation :
Notre projet, développé avec le framework Angular et de Node.js, se base sur la création d'une application web dynamique et intuitive pour la gestion des assignments. Notre application utilise les dernières technologies Angular, notre solution offre une interface utilisateur réactive et facile à naviguer, permettant aux utilisateurs de créer, de consulter, d'ajouter, de supprimer, de suivre et de gérer efficacement les assignments. L'application intègre des fonctionnalités avancées telles que la liaison des dashbords faits sur Power BI.

Vous avez deux options pour faire fonctionner l'application :
* Soit vous naviguez directement vers le lien de l'application déjà déployé sur Render : https://service2222-projet-angular-front-end.onrender.com

* Soit vous suivez la procédure dans la partie [Intallation](#installation)
            

## Commentaires :

Nous avons testé toutes les fonctionnalités listés ci-après qui fonctionnent bien.
Par ailleurs, on a pas pu avoir le temps de rendre plus performant notre serveur ce qui fait que le chargement des données peut prendre un bon moment avant le résultat attendu. C'est une question de performance et d'optimisation qui pouvait se faire avec plus de temps.

Voici les liens utiles :

front-end : https://github.com/dioprawane/DIOP_PRUDENT_AngularProjetAssignments.git

back-end : https://github.com/dioprawane/AngularAPI.git

front déployé sur render : https://service2222-projet-angular-front-end.onrender.com

back déployé sur render : https://service1-projet-angular.onrender.com

Puis pour ce qui concerne ce point : 
- [x] Gestion des droits :
  - Si on n'est pas logué on ne peut que voir la page home

Pour avoir les identifications, essayez de vous connecter avec n'importe quels identifiants et vous aurez en alerte les vrais login/password pour chaque rôle.

### DIOP Serigne Rawane et PRUDENT Arthur : 

## Fonctionnalités intégrées[validé!]
- [x] Au moins 1000 assignments dans la base de données : **<span style="color: green;">OKAY</span>**
- [x] Gestion de login/password : **<span style="color: green;">OKAY</span>**
- [ ] Authentification à l'aide de Json Web Tokens (JWT) : Pas fait par manque de temps
- [x] Nouvelles propriétés au modèle des Assignments : **<span style="color: green;">OKAY</span>**
- [x] APPROCHE AVANCEE : Collection "matières" et/ou "élève" : **<span style="color: green;">OKAY</span>** grâce aux tutoriels de MongoDB University
- [x] Améliorer l'affichage des Assignments : **<span style="color: green;">OKAY</span>**
  - [x] Affichage des assignments dans une table angular material triable, avec ligne des headers fixe (qui ne scrolle pas), avec la pagination avec un moyen pour avoir une vue de détail sur un assignment. : **<span style="color: green;">OKAY</span>**
  - [x] OPTIONNEL : Pagination avec le composant Paginator de angular material : **<span style="color: green;">OKAY</span>**
  - [x] Tables avec datasource, c'est encore plus simple : **<span style="color: green;">OKAY</span>**
  - [x] La vue détails montrera en plus les remarques, la note s'il a été rendu, la photo du prof, les élèves avec leur note, etc : **<span style="color: green;">OKAY</span>**
  - [x] Les formulaires d'ajout et de détails proposeront un choix fixe de matières (et associeront automatiquement le prof et l'image illustrant la matière) : **<span style="color: green;">OKAY</span>**
  - [x] OPTIONNEL : Filtre rendu/non rendu : Selon que cette case est cochée ou pas le tableau affichera uniquement les assignments rendus ou non rendus : **<span style="color: green;">OKAY</span>**
  - [x] OPTIONNEL : Champ de recherche sur le nom de l'assignment qui enverra une requête et affichera les résultats correspondants à la recherche : **<span style="color: green;">OKAY</span>**
  - [x] Optionnel (mais simple à faire): Formulaire de type Stepper (formulaire en plusieurs étapes) pour l'ajout d'Assignments avec contrôle de la validation : **<span style="color: green;">OKAY</span>**
- [x] Rendre le tout plus joli avec une toolbar en haut, une sidebar sur le côté : **<span style="color: green;">OKAY</span>**
- [x] Hébergement sur render.com : **<span style="color: green;">OKAY</span>** (hébergement du front réussi en s'inspirant de celui de l'api aidé par M Buffa)
- [x] Le sujet est ouvert, vous pouvez ajouter ce qui vous semble amusant/pertinent: : **<span style="color: green;">OKAY</span>**
  - [x] Dashbords interactifs sur Power BI intégrés : OKAY
  - [x] Pop up : **<span style="color: green;">OKAY</span>** (pour le détail de l'assignment sur la page home)
  - [x] Footer : **<span style="color: green;">OKAY</span>**
  - [x] Collection de 250 élèves : **<span style="color: green;">OKAY</span>**
  - [x] Collection de 11 matières : **<span style="color: green;">OKAY</span>**
  - [x] Trier le tableau d'assignments en fonction de plusieurs colonnes : **<span style="color: green;">OKAY</span>**
  - [x] Tableau d'assignments avec une option vue en détail et édit : **<span style="color: green;">OKAY</span>**


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

## Prérequis :
* Node.js (v12 ou version ultérieure)
* Angular CLI (v10 ou version ultérieure)

## Installation :
Pour utiliser ce projet, vous aurez besoin de :

1. **Clonez ou téléchargez les projets à partir de GitHub.**
   ```
   $ git clone https://github.com/dioprawane/DIOP_PRUDENT_AngularProjetAssignments.git

   $ git clone https://github.com/dioprawane/AngularAPI.git
   ```

2. **Installez les dépendances Node.js** en exécutant la commande suivante dans le dossier Serveur du projet
   ```
   $ npm install
   ```

3. **Installez le CLI Angular globalement** en exécutant la commande suivante
   ```
   $ npm install -g @angular/cli
   ```

4. **Installation des dépendances Angular** - Naviguez vers les dossiers `assignment-app` pour le premier repository git (front) et `serveur\api` pour le second (back) et installez les dépendances Angular en exécutant la commande suivante :
   ```
   $ cd assignment-app
   $ npm install

   $ cd serveur\api
   $ npm install
   ```

5. **Exécution du projet**

    a. **Démarrez le serveur Node.js** en exécutant la commande suivante dans le dossier `serveur/api` du projet :

   ```
   $ cd serveur\api
   $ node server.js
   ```

    b. **Démarrez le serveur de développement Angular** en exécutant la commande suivante dans le dossier `assignment-app` :

   ```
   $ cd assignment-app
   $ ng serve
   ```

    c. **Accédez à l'application** - Ouvrez votre navigateur et naviguez vers `http://localhost:4200` pour voir l'application fonctionner.

-------------------------------------------------------------------------------------------

## Contact

Si vous avez besoin d'aide ou si vous avez des questions, veuillez nous contacter à notre adresse électronique :

- serigne-rawane.diop@etu.unice.fr
- arthur.prudent@etu.unice.fr

## Ressources :
Angular Material : https://material.angular.io/components/categories

MongoDB documentations : https://www.mongodb.com/docs

MongoDB university : https://learn.mongodb.com/learning-paths/introduction-to-mongodb

Power BI 

Render
