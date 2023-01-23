import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  isCategoryPage!: boolean;

  constructor(
    private productsService: ProductsService,
    private categoryService: CategoriesService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      params['categoryid'] ? this.getProducts([params['categoryid']]) : this.getProducts();
      this.isCategoryPage = params['categoryid'] ? true : false;
    });


    this.getCategories();
  }

  categoryFilter(): void {
    const selectedCategories = this.categories
      .filter(category => category.checked)
      .map(category => category.id);

    this.getProducts(selectedCategories);

  }

  private getProducts(categoiesFiltered?: string[]): void {
    this.productsService.getProducts(categoiesFiltered)
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
