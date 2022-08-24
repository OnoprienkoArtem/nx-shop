import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Product, ProductsService } from '@bluebits/products';
import { MessageService } from 'primeng/api';
import { catchError, filter, of, switchMap, take, tap, timer } from 'rxjs';
import { Location } from '@angular/common';

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
  imageDisplay: string | ArrayBuffer;
  timerBack$ = timer(2000).pipe(tap(() => this.location.back()));

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private messageService: MessageService,
    private location: Location,
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
      isFeatured: [false],
    });
  }

  private getCategories() {
    this.categoriesService.getCategories().subscribe(categories => this.categories = categories);
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const productFormData = new FormData();

    Object.keys(this.productForm).map(key => {
      productFormData.append(key, this.productForm[key].value);
    });

    this.addProduct(productFormData);
  }

  onImageUpload(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();

    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image').updateValueAndValidity();

      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      }
      fileReader.readAsDataURL(file);
    }    
  }

  private addProduct(productData: FormData) {
    this.productsService.createProduct(productData).pipe(
      filter(Boolean),
      tap((product: Product) => this.messageService.add({ severity: 'success', summary: 'Success', detail: `Product ${product.name} is created` })),
      switchMap(() => this.timerBack$),
      catchError(() => of(this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product is not created' }))),
      take(1),
    ).subscribe();
  }

}
