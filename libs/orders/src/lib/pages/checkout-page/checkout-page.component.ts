import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart, CartService, Order, OrderItem, OrdersService, ORDER_STATUS } from '@bluebits/orders';
import { UsersService } from '@bluebits/users';
import { take } from 'rxjs/operators';

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
})
export class CheckoutPageComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  editMode = false;
  countries = [];
  orderItems: OrderItem[] = [];
  userId: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private cartService: CartService,
    private ordersService: OrdersService,
    ) { }

  ngOnInit(): void {
    this.initCheckoutForm();
    this.autoFillUserData();
    this.getCartItems();
    this.getCountries();
  }

  get checkoutForm() {
    return this.form.controls;
  }

  backToCart(): void {
    this.router.navigate(['/cart']);
  }

  placeOrder(): void {
    this.isSubmitted = true;
    if (this.checkoutForm['invalid']) {
      return;
    }

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm['street'].value,
      shippingAddress2: this.checkoutForm['apartment'].value,
      city: this.checkoutForm['city'].value,
      zip: this.checkoutForm['zip'].value,
      country: this.checkoutForm['country'].value,
      phone: this.checkoutForm['phone'].value,
      status: '0',
      user: '5f67be25ef4061637c13a11a',
      dateOrdered: `${Date.now()}`,
    }

    this.ordersService.createOrder(order).subscribe(() => {
      this.cartService.emptyCart();
      this.router.navigate(['/success']);
    });
  }

  initCheckoutForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required],
    });
  }

  private autoFillUserData() {
    this.usersService.observeCurrentUser().pipe(take(1)).subscribe(user => {
      if (user) {
        this.checkoutForm['name'].setValue(user.name);
        this.checkoutForm['email'].setValue(user.email);
        this.checkoutForm['phone'].setValue(user.phone);
        this.checkoutForm['city'].setValue(user.city);
        this.checkoutForm['country'].setValue(user.country);
        this.checkoutForm['zip'].setValue(user.zip);
        this.checkoutForm['apartment'].setValue(user.apartment);
        this.checkoutForm['street'].setValue(user.street);
      }
    });
  }

  private getCartItems() {
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items?.map(item => {
      return {
        product: item.productId,
        quantity: item.quantity
      }
    });

  }

  private getCountries(): void {
    this.countries = this.usersService.getCountries();
  }

}
