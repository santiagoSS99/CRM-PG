import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { PurchaseService } from 'src/app/services/purchase.service';
import 'chart.js/auto';
import { ProductService } from 'src/app/services/product.service';
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
  dataChartToShowAmount: any
  dataChartToShowProductsBySales: any
  productsLabels: Array<any> = []
  constructor(
    private purchaseService: PurchaseService,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.loadTotalAmountPurchase();
    this.productsWithSales()
  }

  initPerformanceChart() {

  }

  loadTotalAmountPurchase() {
    this.purchaseService.getDataAmountToDash(this.token).subscribe(
      res => {

        if (res) {
          this.dataChartToShowAmount = document.getElementById('myChart1');
          new Chart(this.dataChartToShowAmount, {
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
              plugins: {
                title: {
                  display: true,
                  text: 'Ventas por mes',
                  padding: {
                    top: 10,
                    bottom: 30
                  }
                }
              }
            }
          });
        }

        console.log(res)
        console.log(res.data)
      })
  }

  productsWithSales() {
    this.productService.productsWithSales(this.token).subscribe(
      res => {
        console.log(res.data.productNames);
        this.productsLabels = res

        if (res) {
          this.dataChartToShowProductsBySales = document.getElementById('myChart3');
          new Chart(this.dataChartToShowProductsBySales, {
            type: 'polarArea',
            data: {
              labels: res.data.productNames,
              datasets: [{
                label: 'Total ',
                data: res.data.selled,
                borderWidth: 1
              }]
            },
            options: {
              plugins: {
                title: {
                  display: true,
                  text: 'Productos con mas demanda',
                  padding: {
                    top: 10,
                    bottom: 30
                  }
                }
              }
            }
          });
        }

      })
  }

}
