import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-e-commerce',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  products: any
  carritoLista: string[] = [];
  carritoTotal: number = 0;

  constructor(
    private prouductService: ProductService,
  ) { }

  ngOnInit(): void {
    this.initData()
  }

  // script.js

  initData() {
    this.prouductService.getProducts().subscribe(
      res => {
        this.products = res
        console.log(res)
      }
    )
  }


  agregarAlCarrito(productoNombre: string, productoPrecio: number) {
    this.carritoLista.push(productoNombre, productoPrecio.toFixed(2));
    this.carritoTotal += productoPrecio;
  }

  comprar() {
    alert(`Total de la compra: $${this.carritoTotal.toFixed(2)}`);
    this.carritoLista = [];
    this.carritoTotal = 0;
  }
}
