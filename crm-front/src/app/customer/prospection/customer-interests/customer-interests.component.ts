import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { PurchaseLinesService } from 'src/app/services/purchase-lines.service';
import { Chart } from 'chart.js';
import 'chart.js/auto';
@Component({
  selector: 'app-customer-interests',
  templateUrl: './customer-interests.component.html',
  styleUrls: ['./customer-interests.component.scss']
})
export class CustomerInterestsComponent implements OnInit {

  id: any;
  loading: boolean = true;
  token = localStorage.getItem('token') ?? '';
  customer: any = {};
  data = false;
  load_data = false;
  purchaseLines: any;
  purchaseLinesMap: any = {};
  dataChartToShowPurchaseLines: any

  constructor(
    private _route: ActivatedRoute,
    private customerService: CustomerService,
    private purchaseLineService: PurchaseLinesService
  ) { 
    this.loading = true;
  }

  getCustomer(){
    return this.customer;
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        console.log(this.id )
        this.id = parseInt(params['id'], 10)

        this.purchaseLineService.getPurchasesLinesByCustomer(this.token).subscribe(
          (res: any) => {
            this.purchaseLines = res.filter((purchaseLine: any) => {
              if(purchaseLine.customer === this.id){
                return purchaseLine;
              }
            });

            this.purchaseLines.forEach((purchaseLine: any) => {
              if(!this.purchaseLinesMap[purchaseLine.productName]){
                this.purchaseLinesMap[purchaseLine.productName] = purchaseLine.totalQuantity;
              }else{
                this.purchaseLinesMap[purchaseLine.productName]+= purchaseLine.totalQuantity;
              }
            });
            console.log(this.purchaseLinesMap);
            this.dataChartToShowPurchaseLines = document.getElementById('purchaseLinesChart');
          new Chart(this.dataChartToShowPurchaseLines, {
            type: 'polarArea',
            data: {
              labels: Object.keys(this.purchaseLinesMap),
              datasets: [{
                label: 'Total',
                data: Object.values(this.purchaseLinesMap),
                borderWidth: 1
              }]
            },
            options: {
              plugins: {
                title: {
                  display: true,
                  text: 'Productos favoritos del cliente',
                  padding: {
                    top: 10,
                    bottom: 30
                  }
                }
              }
            }
          });
            this.loading = false;
          }
        )
      }
    )
  }

}
