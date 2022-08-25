import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@bluebits/products';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {

  products = [];

  constructor(
    private productService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchCategories();
  }

  updateProduct(product: Product): void {
    this.router.navigateByUrl(`products/form/${product.id}`);
  }

  private fetchCategories(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

}
