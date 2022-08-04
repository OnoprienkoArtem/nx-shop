import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@bluebits/products';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,  
  ) { }

  ngOnInit(): void {
    this.fetchCategories();
  }

  private fetchCategories() {
    this.categoriesService.getCategories().subscribe(categories => this.categories = categories);
  }

  deleteCategory(category: Category) {
    this.categoriesService.deleteCategory(category.id).subscribe({
      next: () => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: `Category ${category.name} is deleted`});
        this.fetchCategories();
      },
      error: () => this.messageService.add({severity: 'success', summary: 'Success', detail: 'Category is not deleted'})
    });
  }

  editCategory() {

  }

}
