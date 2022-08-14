import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@bluebits/products';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {

  products = [];

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.fetchCategories();
  }

  private fetchCategories(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

}
