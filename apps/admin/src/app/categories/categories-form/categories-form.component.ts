import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@bluebits/products';
import { MessageService } from 'primeng/api';
import { filter, timer, tap, switchMap, catchError, of, take } from 'rxjs';
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
  currentCategoryId: string;
  timerBack$ = timer(2000).pipe(tap(() => this.location.back()));

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
      color: ['#fff'],
    });

    this.checkEditMode();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const category: Category = {
      id: this.currentCategoryId,
      name: this.categoryForm['name'].value,
      icon: this.categoryForm['icon'].value,
      color: this.categoryForm['color'].value
    };    

    if (this.editMode) {
      this.updateCategory(category);
    } else {
      this.addCategory(category);
    }
  }

  get categoryForm() {
    return this.form.controls;
  }

  private addCategory(category: Category): void {
    this.categoriesService.createCategory(category).pipe(
      filter(Boolean),
      tap((category: Category) => this.messageService.add({severity: 'success', summary: 'Success', detail: `Category ${category.name} is created`})),
      switchMap(() => this.timerBack$),
      catchError(() => of(this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category is not created' }))),
      take(1),
    ).subscribe();
  }

  private updateCategory(category: Category): void {
    this.categoriesService.updateCategory(category).pipe(
      filter(Boolean),
      tap((category: Category) => this.messageService.add({severity: 'success', summary: 'Success', detail: `Category ${category.name} is updated`})),
      switchMap(() => this.timerBack$),
      catchError(() => of(this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category is not updated' }))),
      take(1),
    ).subscribe();
  }

  private checkEditMode() {
    this.route.params.pipe(
      filter(params => params['id']),
      tap(params => {
        this.editMode = true;
        this.currentCategoryId = params['id'];
      }),
      switchMap(params => {
        return this.categoriesService.getCategory(params['id'])
      }),
      tap(category => {
        this.form.patchValue({
          name: category.name,
          icon: category.icon,
          color: category.color
        });
      }),
      take(1),
    ).subscribe();
  }

}
