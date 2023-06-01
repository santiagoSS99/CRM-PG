import { Component, OnInit, Input } from '@angular/core';
import { text } from '@fortawesome/fontawesome-svg-core';
import { Order } from 'src/app/interfaces/order';
import { Product } from 'src/app/interfaces/product';
import { TableStatus, OrderStatus } from 'src/app/enums';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductService } from 'src/app/services/product.service';
import { TablesService } from 'src/app/services/tables.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-product-selection',
  templateUrl: './product-selection.component.html',
  styleUrls: ['./product-selection.component.scss'],
})
export class ProductSelectionComponent implements OnInit {
  @Input() tables: any;
  selectedTable: any;
  selectedProductsMap: Record<
    string,
    {
      quantity: number;
      product: Product;
    }
  > = {};
  scope: ProductSelectionComponent;
  products: any;
  quantity: any;
  total: number = 0;

  tablesSubscription: Subscription;
  productsSubscription: Subscription;

  modalClose: any;
  modalProductSelection: any;
  modalMutationObserver: any;

  paymentEnabled: boolean = false;

  orders: Order[] = [];
  order: Order = {
    order_date: new Date(),
    order_details: '',
    tableId: undefined,
    quantity: 0,
  };

  constructor(
    private tableService: TablesService,
    private orderService: OrdersService,
    private productService: ProductService
  ) {
    this.scope = this;
    this.tablesSubscription = this.tableService.currentTable.subscribe(
      (table) => {
        this.selectedTable = table;
      }
    );
    this.productsSubscription = this.productService.products.subscribe(
      (prods) => {
        this.products = prods;
      }
    );
  }

  observerFunction = (mutations: any) => {
    const controller = this;
    mutations.forEach(function (mutation: any) {
      if (mutation.attributeName === 'class') {
        if (mutation.target.classList.contains('show')) {
          /**
           * Ejecución al abrir el modal
           * **/
          controller.productService.reloadProducts();
          if (
            controller.selectedTable.table_status.id ===
            TableStatus.Ocupado + 1
          ) {
            controller.paymentEnabled = true;
            controller.orderService.reloadOrders(controller.selectedTable.id).subscribe((newOrders: Order[]) => {
              controller.orders = newOrders;
              controller.orders.forEach((order) => {
                const { product } = order;
                controller.selectedProductsMap[product.id] = {
                  product,
                  quantity: order.quantity,
                };
              });
              controller.setTotal();
            });
          }
        } else {
          /**
           * Ejecución al cerrar el modal
           * **/
          console.log('Cerre el modal el modal');
          controller.paymentEnabled = false;
        }
      }
    });
  };

  ngOnInit(): void {
    this.getProducts();
    this.modalProductSelection = document.querySelector(
      '#modalToAddProductToRable'
    );
    this.modalClose = document.querySelector('#modalToAddProductToRable .btn-close');
    this.modalMutationObserver = new MutationObserver(this.observerFunction);

    this.modalMutationObserver.observe(this.modalProductSelection, {
      attributes: true,
    });
  }

  ngOnDestroy() {
    this.tablesSubscription.unsubscribe();
    this.productsSubscription.unsubscribe();
    this.modalMutationObserver?.disconnect();
  }

  getProducts() {
    this.productService.getProducts().subscribe((productsResponse) => {
      this.products = productsResponse;
    });
  }

  selectProduct(product: any) {
    if (product) {
      if (!this.selectedProductsMap[product.id]) {
        if (product.stock - product.selled === 0) {
          Swal.fire({
            title: 'No hay más existencias de este producto',
            text: 'Lo sentimos no hay más existencias de este producto',
            icon: 'warning',
            cancelButtonColor: '#d33',
          });
          return;
        }
        this.selectedProductsMap[product.id] = {
          product,
          quantity: 1,
        };
      } else {
        if (
          product.stock - product.selled === 0 ||
          this.selectedProductsMap[product.id].quantity >=
            product.stock - product.selled
        ) {
          Swal.fire({
            title: 'No hay más existencias de este producto',
            text: 'Lo sentimos no hay más existencias de este producto',
            icon: 'warning',
            cancelButtonColor: '#d33',
          });
          return;
        }
        this.selectedProductsMap[product.id].quantity++;
      }
      const cards = document.querySelectorAll('.card');
      cards.forEach((card) => {
        if (
          card.querySelector('.card-title')?.textContent ===
          product.product_name
        ) {
          card.classList.toggle('selected', true);
        }
      });
    }
    this.setTotal();
  }

  removeProduct(product: any) {
    if (product) {
      // El producto ya está en selectedProducts, lo removemos
      if (!this.selectedProductsMap[product.id]) {
        this.selectedProductsMap[product.id] = {
          product,
          quantity: 0,
        };
      } else {
        if (this.selectedProductsMap[product.id].quantity > 0) {
          this.selectedProductsMap[product.id].quantity--;
        }
        if (this.selectedProductsMap[product.id].quantity === 0) {
          const cards = document.querySelectorAll('.card');
          cards.forEach((card) => {
            if (
              card.querySelector('.card-title')?.textContent ===
              product.product_name
            ) {
              card.classList.toggle('selected', false);
            }
          });
        }
      }

      this.setTotal();
    }
  }

  setProductInTable() {
    if (Object.keys(this.selectedProductsMap).length === 0) {
      Swal.fire({
        title: 'No hay productos selecionados',
        text: 'Por favor asegurese de seleccionar al menos un producto',
        icon: 'warning',
        cancelButtonColor: '#d33',
      });
      return;
    }

    let noQuantity = 0;
    Object.entries(this.selectedProductsMap).forEach((productItem) => {
      const [id, productData] = productItem;
      if (productData.quantity <= 0) {
        noQuantity++;
      }
    });

    if (Object.keys(this.selectedProductsMap).length === noQuantity) {
      Swal.fire({
        title: 'No hay productos selecionados',
        text: 'Por favor asegurese de seleccionar al menos un producto',
        icon: 'warning',
        cancelButtonColor: '#d33',
      });
      return;
    }

    let occupiedStatus = {
      status: TableStatus.Ocupado + 1,
    };

    this.tableService
      .setOcuppiedTable(this.selectedTable.id, occupiedStatus)
      .subscribe((res) => {
        this.tableService.reloadTables();
      });
    Object.entries(this.selectedProductsMap).forEach(
      (product: any, index: number) => {
        const [productId, productData] = product;

        const currentOrder = this.orders.find((order) => order.product.id === productId)

        if(!currentOrder){
          let orderDetail = {
            order_date: new Date(),
            order_details: productData.product.product_name,
            product: productId,
            quantity: productData.quantity,
            amount: productData.quantity * productData.product.price,
            order_status: OrderStatus.En_Proceso + 1,
            tableId: this.selectedTable.id,
            observations: 'Ninguna',
          };
  
          this.orderService.createOrder(orderDetail).subscribe((res) => {
            console.log('After request of createOrder');
            this.modalClose.click();
          });
        }else{
          let orderDetail = {
            order_date: currentOrder.order_date,
            order_details: currentOrder.order_details,
            quantity: productData.quantity,
            amount: productData.quantity * productData.product.price,
            order_status: OrderStatus.En_Proceso + 1,
            tableId: this.selectedTable.id,
            observations: currentOrder.observations,
          };
          console.log(orderDetail);
          this.orderService.updateOrder(currentOrder.id,orderDetail).subscribe((res) => {
            console.log('After request of updateOrder');
            this.modalClose.click();
          });
        }
      }
    );
  }

  setTotal() {
    this.total = Object.entries(this.selectedProductsMap).reduce(
      (acc, currentProduct) => {
        const [productId, { quantity }] = currentProduct;
        const foundProduct = this.products.find(
          (searchProduct: Product) => searchProduct.id === productId
        );
        return acc + quantity * foundProduct.price;
      },
      0
    );
    console.log(this.total);
  }

  resetSelectedCards() {
    const cards = document.querySelectorAll('.card.selected');
    cards.forEach((card) => {
      card.classList.remove('selected');
    });
  }

  resetData() {
    this.total = 0;
    this.selectedProductsMap = {};
    this.orders = [];
    this.resetSelectedCards();
  }
}
