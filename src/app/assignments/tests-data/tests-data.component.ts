import { AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';

declare let $: any;

@Component({
  selector: 'app-tests-data',
  templateUrl: './tests-data.component.html',
  styleUrls: ['./tests-data.component.css']
})
export class TestsDataComponent implements AfterViewInit {

  title = 'Tests de données';

  ngAfterViewInit(): void {
  }
}
