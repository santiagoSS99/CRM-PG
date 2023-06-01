import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { PurchaseLinesService } from 'src/app/services/purchase-lines.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  token = localStorage.getItem('token')
  labels: any;
  chartProductCustomer: any
  quantity = [];

  constructor(
    private purchaseLineService: PurchaseLinesService
  ) { }

  ngOnInit(): void {
    this.dashboardCustomerProduct()
  }

  dashboardCustomerProduct() {
    this.purchaseLineService.getdataByCustomerProduct(this.token).subscribe(
      res => {
        console.log(res)
        if (res) {
          this.chartProductCustomer = document.getElementById('myChart1');
          new Chart(this.chartProductCustomer, {
            type: 'line',
            data: {
              labels: res.customerName,
              datasets: [{
                label: 'Total ',
                data: res.totalQuantity,
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
      });
  }

}
