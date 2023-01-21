import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category, Product } from '@bluebits/products';
import { map, tap } from 'rxjs';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];
  categories: Category[] = [];
  checked = true;

  constructor(
    private productsService: ProductsService,
    private categoryService: CategoriesService,
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  categoryFilter(): void {
    const selectedCategories = this.categories
      .filter(category => category.checked)
      .map(category => category.id);
    console.log(selectedCategories);

  }

  private getProducts(): void {
    this.productsService.getProducts()
      .pipe(
        tap(resProducts => this.products = resProducts)
      )
      .subscribe();
  }

  private getCategories(): void {
    this.categoryService.getCategories()
      .pipe(
        tap(resCategories => this.categories = resCategories)
      )
      .subscribe();
  }

}
