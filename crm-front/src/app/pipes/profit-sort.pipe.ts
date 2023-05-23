import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'profitSort'
})
export class ProfitSortPipe implements PipeTransform {
  transform(products: any[]): any[] {
    if (!products || products.length <= 1) {
      return products;
    }

    // Ordenar los productos según la ganancia de mayor a menor
    return products.sort((a, b) => {
      const profitA = a.selled * a.price - a.selled * a.purchaseprice;
      const profitB = b.selled * b.price - b.selled * b.purchaseprice;

      return profitB - profitA;
    });
  }
}
