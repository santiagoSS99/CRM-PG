import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { CustomerService } from 'src/app/services/customer.service';
import { ProductService } from 'src/app/services/product.service';
import { PurchaseLinesService } from 'src/app/services/purchase-lines.service';
import { PurchaseService } from 'src/app/services/purchase.service';

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
  totalInvestment: any;

  totalCustomer: any;
  customers: any;
  visitingCustomers: any

  year: any
  month: any
  dataChartToShowAmount: any
  dataChartToShowProductsBySales: any
  productsLabels: Array<any> = []

  paymentMethod: any

  constructor(
    private purchaseLineService: PurchaseLinesService,
    private customerService: CustomerService,
    private purchaseService: PurchaseService,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    // this.dashboardCustomerProduct()
    this.initData()
  }

  initData() {
    this.getTotalInvestment();
    this.getTotalCustomers();
    this.loadTotalAmountPurchase();
    this.productsWithSales();
    this.getCustomers();
    this.getTopVisitingCustomers();
    this.getPaymentMethod()
  }

  // dashboardCustomerProduct() {
  //   this.purchaseLineService.getdataByCustomerProduct(this.token).subscribe(
  //     res => {
  //       console.log(res)
  //       if (res) {
  //         this.chartProductCustomer = document.getElementById('myChart1');
  //         new Chart(this.chartProductCustomer, {
  //           type: 'line',
  //           data: {
  //             labels: res.customerName,
  //             datasets: [{
  //               label: 'Total ',
  //               data: res.totalQuantity,
  //               borderWidth: 1
  //             }]
  //           },
  //           options: {
  //             plugins: {
  //               title: {
  //                 display: true,
  //                 text: 'Ventas por mes',
  //                 padding: {
  //                   top: 10,
  //                   bottom: 30
  //                 }
  //               }
  //             }
  //           }
  //         });
  //       }
  //     });
  // }

  getTopVisitingCustomers() {
    this.purchaseService.getTopVisitingCustomers(this.token).subscribe(
      res => {
        console.log(res)
        this.visitingCustomers = res
      }
    )
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe(
      res => {
        this.customers = res
        console.log(this.customers)
      }
    )
  }

  getTotalInvestment() {
    this.productService.getTotalInvestment().subscribe(
      res => {
        console.log(res)
        this.totalInvestment = res
      }
    )
  }

  getTotalCustomers() {
    this.customerService.getTotalCustomers().subscribe(
      res => {
        this.totalCustomer = res
      }
    )
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
            type: 'doughnut',
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
                legend: {
                  position: 'bottom',
                  display: true,
                  labels: {
                    textAlign: 'center'
                  }
                },
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

  getPaymentMethod() {
    this.purchaseService.getPaymentMethod(this.token).subscribe(
      res => {
        console.log(res)
        this.paymentMethod = res
      }
    )
  }


}
