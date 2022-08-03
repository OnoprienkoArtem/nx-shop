import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@bluebits/products';
import { MessageService } from 'primeng/api';
import { filter, delay, timer, tap, mergeMap, switchMap, catchError, of } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const category: Category = {
      name: this.categoryForm['name'].value,
      icon: this.categoryForm['icon'].value,
    };

    console.log(this.categoryForm['name'].value);
    console.log(this.categoryForm['icon'].value);

    // this.categoriesService.createCategory(category).subscribe({
    //   next: () => this.messageService.add({severity: 'success', summary: 'Success', detail: 'Category is created'}),
    //   error: () => this.messageService.add({severity: 'error', summary: 'Error', detail: 'Category is not created'}),
    //   complete: () => timer(2000).toPromise().then(() => this.location.back()),
    // });

    const timerBack$ = timer(2000).pipe(tap(() => this.location.back()));

    this.categoriesService.createCategory(category).pipe(
      filter(Boolean),
      tap(() => this.messageService.add({severity: 'success', summary: 'Success', detail: 'Category is created'})),
      switchMap(() => timerBack$),
      catchError(() => of(this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category is not created' })))
    ).subscribe();
  }

  get categoryForm() {
    return this.form.controls;
  }

}
