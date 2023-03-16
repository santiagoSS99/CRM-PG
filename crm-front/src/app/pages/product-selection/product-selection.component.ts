import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/interfaces/order';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductService } from 'src/app/services/product.service';
import { TablesService } from 'src/app/services/tables.service';

@Component({
  selector: 'app-product-selection',
  templateUrl: './product-selection.component.html',
  styleUrls: ['./product-selection.component.scss']
})
export class ProductSelectionComponent implements OnInit {

  @Input() tables: any
  selectedTable: any
  selectedProducts: any[] = [];
  products: any
  quantity: number | undefined


  order: Order = {
    order_date: new Date(),
    order_details: '',
    tableId: undefined,
    quantity: 0
  }


  constructor(
    private tableService: TablesService,
    private orderService: OrdersService,
    private productService: ProductService
  ) { }


  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.productService.getProducts().subscribe(res => {
      this.products = res
    })
  }

  getTableById(id: any) {
    this.tableService.getTableById(id).subscribe(res => {
      this.selectedTable = res
      console.log(id)
    })
  }

  selectProduct(product: any) {
    if (product) {
      const index = this.selectedProducts.indexOf(product.product_name);
      if (index !== -1) {
        // El producto ya está en selectedProducts, lo removemos
        this.selectedProducts.splice(index, 1);
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
          if (card.querySelector('.card-title')?.textContent === product.product_name) {
            card.classList.toggle('selected', false);
          }
        });
      } else {
        // El producto no está en selectedProducts, lo agregamos
        this.selectedProducts.push(product.product_name);
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
          if (card.querySelector('.card-title')?.textContent === product.product_name) {
            card.classList.toggle('selected', true);
          }
        });
      }
      console.log(this.selectedProducts);
    }
  }

  setProductInTable(tableId: any) {
    console.log(this.selectedProducts)
    // console.log(tableId)

    this.selectedProducts.forEach(product => {
      // console.log(product)
      let orderDetail = {
        order_date: new Date(),
        order_details: product,
        quantity: this.order.quantity // Otra manera de capturar la cantidad, en este caso se asume que es 1
      };
      console.log(this.order.quantity)

      console.log(orderDetail)

      this.orderService.createOrder(tableId, orderDetail).subscribe(res => {
        console.log(res);
      });
    });
  }
}