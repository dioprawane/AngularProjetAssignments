import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-detail-affiche-assignments',
  templateUrl: './detail-affiche-assignments.component.html',
  styleUrls: ['./detail-affiche-assignments.component.css']
})
export class DetailAfficheAssignmentsComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public assignment: any) {}

}
