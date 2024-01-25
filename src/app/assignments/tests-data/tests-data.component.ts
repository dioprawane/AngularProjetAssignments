import { AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';

declare let $: any;

@Component({
  selector: 'app-tests-data',
  templateUrl: './tests-data.component.html',
  styleUrls: ['./tests-data.component.css']
})
export class TestsDataComponent implements AfterViewInit {

  title = 'Tests de données';

  @ViewChild('revealView', { static: false }) el!: ElementRef;
  private revealView: any;

  ngAfterViewInit(): void {
    //$.ig.RevealSdkSettings.setBaseUrl('https://service1-projet-angular.onrender.com/api/assignments/');
    $.ig.RevealSdkSettings.setBaseUrl('https://samples.Revealbi.io/upmedia-backend/reveal-api/');
    $.ig.RevealSdkSettings.ensureFontsLoadedAsync().then(() => {
      $.ig.RVDashboard.loadDashboard('Sales', (dashboard: any) => {
        //$.ig.RVDashboard.loadDashboard('assignments', (dashboard: any) => {
        this.revealView = new $.ig.RevealView(this.el.nativeElement);
        this.revealView.dashboard = dashboard;
      });
    });
  }
}
