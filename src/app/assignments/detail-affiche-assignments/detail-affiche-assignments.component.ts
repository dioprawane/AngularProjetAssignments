import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import {MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-detail-affiche-assignments',
  templateUrl: './detail-affiche-assignments.component.html',
  styleUrls: ['./detail-affiche-assignments.component.css']
})
export class DetailAfficheAssignmentsComponent implements AfterViewInit {

  displayedColumns: string[] = ['nom', 'prenom', 'note'];
  //dataSource = this.assignment.eleves;
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(@Inject(MAT_DIALOG_DATA) public assignment: any) {
    this.dataSource = new MatTableDataSource(assignment.eleves);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}