import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'products-categories-banner',
  templateUrl: './categories-banner.component.html',
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  unSub$: Subject<any> = new Subject();

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categoriesService.getCategories()
      .pipe(
        takeUntil(this.unSub$),
        tap(categories => this.categories = categories)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unSub$.next(false);
    this.unSub$.complete();
  }

}
