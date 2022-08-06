import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@bluebits/products';
import { MessageService } from 'primeng/api';
import { filter, timer, tap, switchMap, catchError, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  editMode = false;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
    });

    this.checkEditMode();
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

  private checkEditMode() {
    this.route.params.pipe(
      filter(params => params['id']),
      tap(() => this.editMode = true),
      switchMap(params => {
        return this.categoriesService.getCategory(params['id'])
      }),
      tap(category => {
        this.form.patchValue({
          name: category.name,
          icon: category.icon
        });
      })
    ).subscribe();
  }

}
