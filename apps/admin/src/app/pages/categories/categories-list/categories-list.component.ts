import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@bluebits/products';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];

  unSubscription$ = new Subject();

  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchCategories();
  }

  ngOnDestroy(): void {
    this.unSubscription$.next(true);
    this.unSubscription$.complete();
  }

  private fetchCategories(): void {
    this.categoriesService.getCategories()
      .pipe(
        takeUntil(this.unSubscription$),
      )
      .subscribe(categories => this.categories = categories);
  }

  deleteCategory(category: Category): void {
    this.confirmationService.confirm({
      message: `Do you want to delete this '${category.name}' category?`,
      header: `Delete '${category.name}' category`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(category.id)
          .pipe(
            takeUntil(this.unSubscription$),
          )
          .subscribe({
            next: () => {
              this.messageService.add({severity: 'success', summary: 'Success', detail: `Category ${category.name} is deleted`});
              this.fetchCategories();
            },
            error: () => this.messageService.add({severity: 'success', summary: 'Success', detail: 'Category is not deleted'})
          });
      },
    });
  }

  updateCategory(category: Category): void {
    this.router.navigateByUrl(`categories/form/${category.id}`);
  }
}
