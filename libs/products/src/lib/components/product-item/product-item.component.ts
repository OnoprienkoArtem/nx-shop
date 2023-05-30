import { Component, Input } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CartItem, CartService } from '@bluebits/orders';
import { Product } from '../../models/product';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html'
})
export class ProtuctItemComponent {

  @Input() product!: Product;

  constructor(private cartService: CartService) { }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: 1,
    }
    this.cartService.setCartItem(cartItem);
  }
}
