import { Component, OnInit } from '@angular/core';
import { Product } from '@bluebits/products';
import { tap } from 'rxjs';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts() {
    this.productsService.getProducts()
      .pipe(
        tap(resProducts => this.products = resProducts)
      )
      .subscribe();
  }

}
