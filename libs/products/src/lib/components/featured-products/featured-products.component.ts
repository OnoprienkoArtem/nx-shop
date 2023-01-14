import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '@bluebits/products';
import { Subject, takeUntil, tap } from 'rxjs';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-featured-products',
  templateUrl: './featured-products.component.html',
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {

  featuredProducts: Product[] = [];

  unSub$: Subject<any> = new Subject();

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getFeaturedProduct();
  }

  ngOnDestroy(): void {
    this.unSub$.next(false);
    this.unSub$.complete();
  }

  private getFeaturedProduct() {
    this.productsService.getFeaturedProducts(4)
      .pipe(
        takeUntil(this.unSub$),
        tap(products => this.featuredProducts = products)
      )
      .subscribe();
  }
}
