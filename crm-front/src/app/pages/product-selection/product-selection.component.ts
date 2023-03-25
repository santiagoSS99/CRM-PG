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
  selectedProductsToSaveInTable: any[] = [];
  products: any;
  quantity: any;
  total: number = 0;


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
      this.selectedProducts.push(product);
      this.selectedProductsToSaveInTable.push(product.product_name)
      const cards = document.querySelectorAll('.card');
      cards.forEach(card => {
        if (card.querySelector('.card-title')?.textContent === product.product_name) {
          card.classList.toggle('selected', true);
        }
      });
      console.log(this.selectedProducts);
    }
    this.setTotal()
  }

  removeProduct(product: any) {
    const index = this.selectedProducts.findIndex(p => p.product_name === product.product_name);
    if (index !== -1) {
      // El producto ya está en selectedProducts, lo removemos
      this.selectedProducts.splice(index, 1);
      this.selectedProductsToSaveInTable.splice(index, 1);
      const cards = document.querySelectorAll('.card');
      cards.forEach(card => {
        if (card.querySelector('.card-title')?.textContent === product.product_name) {
          card.classList.toggle('selected', false);
        }
      });
      this.setTotal();
    }
  }

  setProductInTable(tableId: any) {
    console.log(this.selectedProductsToSaveInTable)
    this.selectedProductsToSaveInTable.forEach(product => {
      let orderDetail = {
        order_date: new Date(),
        order_details: product,
        quantity: 1
      };
      console.log(orderDetail)

      this.orderService.createOrder(tableId, orderDetail).subscribe(res => {
        console.log(res);
      });
    });
  }

  setTotal() {
    this.total = this.selectedProducts.reduce((acc, curr) => {
      return acc + curr.price;
    }, 0);
    console.log(this.total);
  }

  resetData() {
    this.selectedProducts = []
  }
}