import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '@bluebits/products';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit {
  form: FormGroup;
  editMode = false;
  isSubmitted = false;
  categories = [];

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getCategories();
  }

  get productForm() {
    return this.form.controls;
  }

  private initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStoke: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: [''],
      isFeatured: [''],
    });
  }

  private getCategories() {
    this.categoriesService.getCategories().subscribe(categories => this.categories = categories);
  }

  onSubmit() {}

}
