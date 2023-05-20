import { Component, OnInit } from '@angular/core';
declare var ApexCharts: any

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {

  year: any
  month: any
  constructor() { }

  ngOnInit(): void {
  }

  initPerformanceChart() {

  }



}
