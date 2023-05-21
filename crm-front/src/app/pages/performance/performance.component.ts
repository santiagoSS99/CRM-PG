import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { PurchaseService } from 'src/app/services/purchase.service';
import 'chart.js/auto';
// import 'chartjs-adapter-chartjs/dist/chartjs-adapter-chart.js';
// 
declare var ApexCharts: any

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {

  token = localStorage.getItem('token')
  year: any
  month: any
  dataChart: any
  constructor(
    private purchaseService: PurchaseService
  ) { }

  ngOnInit(): void {
    this.loadTotalAmountPurchase()
  }

  initPerformanceChart() {

  }

  loadTotalAmountPurchase() {
    this.purchaseService.getDataAmountToDash(this.token).subscribe(
      res => {

        if (res) {
          this.dataChart = document.getElementById('myChart1');
          new Chart(this.dataChart, {
            type: 'line',
            data: {
              labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'],
              datasets: [{
                label: 'Total ',
                data: res.data,
                borderWidth: 1
              }]
            },
            options: {
              // scales: {
              //   y: {
              //     beginAtZero: true
              //   }
              // }
            }
          });
        }

        console.log(res)
        console.log(res.data)
      })
  }

}
