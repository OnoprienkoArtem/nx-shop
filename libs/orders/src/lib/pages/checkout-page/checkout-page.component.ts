import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order, OrderItem } from '@bluebits/orders';
import { UsersService } from '@bluebits/users';

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
  styles: [
  ]
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
    ) { }

  ngOnInit(): void {
    this.initCheckoutForm();
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
      phone: this.checkoutForm['strphoneeet'].value,
      status: this.checkoutForm['status'].value,
      totalPrice: this.checkoutForm['totalPrice'].value,
      user: this.userId,
      dateOrdered: `${Date.now()}`,
    }
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

  private getCountries(): void {
    this.countries = this.usersService.getCountries();
  }

}
