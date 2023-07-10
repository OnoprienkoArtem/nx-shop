import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    ) { }

  ngOnInit(): void {
    this.initCheckoutForm();
    this.getCountries();
  }

  get userForm() {
    return this.form.controls;
  }

  backToCart(): void {
    this.router.navigate(['/cart']);
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
