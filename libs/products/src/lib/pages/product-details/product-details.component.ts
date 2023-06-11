import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem, CartService } from '@bluebits/orders';
import { Subject, takeUntil, tap } from 'rxjs';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-product-details',
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  quantity = 1;
  product!: Product;
  unSub$: Subject<any> = new Subject();

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['productId']) {
        this.getProduct(params['productId']);
      }
    });
  }

  ngOnDestroy(): void {
    this.unSub$.next(true);
    this.unSub$.complete();
  }

  private getProduct(id: string): void {
    this.productsService.getProduct(id)
      .pipe(
        tap(resProduct => this.product = resProduct),
        takeUntil(this.unSub$),
      )
      .subscribe();
  }

  addProductToCart(): void {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: this.quantity,
    }
    this.cartService.setCartItem(cartItem);
  }

}
