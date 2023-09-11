import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart, CartService, Order, OrderItem, OrdersService } from '@bluebits/orders';
import { UsersService } from '@bluebits/users';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  isSubmitted = false;
  editMode = false;
  countries = [];
  orderItems: OrderItem[] = [];
  userId: string;
  unSubscribe$: Subject<any> = new Subject();

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

  ngOnDestroy(): void {
    this.unSubscribe$.next(false);
    this.unSubscribe$.complete();
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
      user: this.userId,
      dateOrdered: `${Date.now()}`,
    }

    this.ordersService.cacheOrderData(order);

    this.ordersService.createCheckoutSession(this.orderItems).subscribe(error => {
      if (error) {
        console.log('error in redirect to payment');
      }
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
    this.usersService.observeCurrentUser().pipe(takeUntil(this.unSubscribe$)).subscribe(user => {
      if (user) {
        this.userId = user.id;
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
