import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RenduDirective } from './shared/rendu.directive';
import { NonRenduDirective } from './shared/non-rendu.directive';
import { AssignmentsComponent } from './assignments/assignments.component';
import { ListAssignmentsComponent } from './assignments/list-assignments/list-assignments.component';
import { AddAssignmentsComponent } from './assignments/add-assignments/add-assignments.component';
import { ChangeAssignmentsComponent } from './assignments/change-assignments/change-assignments.component';
import { DeleteAssignmentsComponent } from './assignments/delete-assignments/delete-assignments.component';
import { TestsDataComponent } from './assignments/tests-data/tests-data.component';
import { DetailAssignmentsComponent } from './assignments/detail-assignments/detail-assignments.component';
import { FooterComponent } from './footer/footer.component';
import { AssignmentsService } from './shared/assignments.service';
import { LoggingService } from './shared/logging.service';
import { AuthService  } from './shared/auth.service';
import { authGuard } from './shared/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { EditAssignmentsComponent } from './assignments/edit-assignments/edit-assignments.component';
import { LoginComponent } from './assignments/login/login.component';
import { MatieresService } from './shared/matieres.service';
import { ElevesService } from './shared/eleves.service';

const routes: Routes = [
  { path: 'home', component: AssignmentsComponent},
  { path: ' ', component: AssignmentsComponent},
  { path: 'connexion', component: LoginComponent},
  { path: 'list', component: ListAssignmentsComponent},
  { path: 'add', component:AddAssignmentsComponent },
  { path: 'change', component: ChangeAssignmentsComponent },
  { path: 'delete', component: DeleteAssignmentsComponent },
  { path: 'tests', component: TestsDataComponent },
  { path: 'login', component: LoginComponent },
  { path: 'assignment/:id', component: DetailAssignmentsComponent },
  { 
    path: 'assignment/:id/edit', 
    component: EditAssignmentsComponent ,
    canActivate: [authGuard]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    RenduDirective,
    NonRenduDirective,
    AssignmentsComponent,
    ListAssignmentsComponent,
    AddAssignmentsComponent,
    ChangeAssignmentsComponent,
    DeleteAssignmentsComponent,
    TestsDataComponent,
    DetailAssignmentsComponent,
    FooterComponent,
    EditAssignmentsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCheckboxModule,
    MatCardModule,
    MatMenuModule,
    HttpClientModule,
    MatSlideToggleModule,
    NgxPaginationModule,
    MatPaginatorModule,
    RouterModule.forRoot(routes),
    MatTableModule
  ],
  providers: [AssignmentsService, LoggingService, AuthService, MatieresService, ElevesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
