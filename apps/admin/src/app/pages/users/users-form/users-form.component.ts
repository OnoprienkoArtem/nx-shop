import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, filter, of, switchMap, take, tap, timer } from 'rxjs';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from '@bluebits/users';

@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html'
})
export class UsersFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentUserId: string;
  countries = [];
  timerBack$ = timer(2000).pipe(tap(() => this.location.back()));

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.initUserForm();
    this.getCountries();
    this.checkEditMode();
  }

  private getCountries(): void {
    this.countries = this.usersService.getCountries();
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const user: User = {
      id: this.currentUserId,
      name: this.userForm['name'].value,
      password: this.userForm['password'].value,
      email: this.userForm['email'].value,
      phone: this.userForm['phone'].value,
      isAdmin: this.userForm['isAdmin'].value,
      street: this.userForm['street'].value,
      apartment: this.userForm['apartment'].value,
      zip: this.userForm['zip'].value,
      city: this.userForm['city'].value,
      country: this.userForm['country'].value,
    };

    if (this.editMode) {
      this.updateUser(user);
    } else {
      this.addUser(user);
    }
  }

  private initUserForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: [''],
    });
  }

  get userForm() {
    return this.form.controls;
  }

  private addUser(user: User): void {
    this.usersService.createUser(user).pipe(
      filter(Boolean),
      tap((user: User) => this.messageService.add({severity: 'success', summary: 'Success', detail: `User ${user.name} is created`})),
      switchMap(() => this.timerBack$),
      catchError(() => of(this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User is not created' }))),
      take(1),
    ).subscribe();
  }

  private updateUser(user: User): void {
    this.usersService.updateUser(user).pipe(
      filter(Boolean),
      tap((user: User) => this.messageService.add({severity: 'success', summary: 'Success', detail: `User ${user.name} is updated`})),
      switchMap(() => this.timerBack$),
      catchError(() => of(this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User is not updated' }))),
      take(1),
    ).subscribe();
  }

  private checkEditMode(): void {
    this.route.params.pipe(
      filter(params => params['id']),
      tap(params => {
        this.editMode = true;
        this.currentUserId = params['id'];
      }),
      switchMap(params => {
        return this.usersService.getUser(params['id'])
      }),
      tap(user => {
        this.form.patchValue({
          name: user.name,
          email: user.email,
          phone: user.phone,
          isAdmin: user.isAdmin,
          street: user.street,
          apartment: user.apartment,
          zip: user.zip,
          city: user.city,
          country: user.country,
        });
        this.userForm['password'].setValidators([]);
        this.userForm['password'].updateValueAndValidity();
      }),
      take(1),
    ).subscribe();
  }
}
