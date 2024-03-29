import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Product, ProductsService } from '@bluebits/products';
import { MessageService } from 'primeng/api';
import { catchError, filter, of, switchMap, take, tap, timer } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

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
  currentProductId: string;
  imageDisplay: string | ArrayBuffer;
  timerBack$ = timer(2000).pipe(tap(() => this.location.back()));

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getCategories();
    this.checkEditMode();
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
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
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

    if (this.editMode) {
      this.updateProduct(productFormData);
    } else {
      this.addProduct(productFormData);
    }    
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

  private checkEditMode() {
    this.route.params.pipe(
      filter(params => params['id']),
      tap(params => {
        this.editMode = true;
        this.currentProductId = params['id'];
      }),
      switchMap(params => {
        return this.productsService.getProduct(params['id'])
      }),
      tap(product => {
        this.form.patchValue({
          name: product.name,
          brand: product.brand,
          price: product.price,
          category: product.category.id,
          countInStock: product.countInStock,
          description: product.description,
          richDescription: product.richDescription,
          isFeatured: product.isFeatured,
        });
        this.imageDisplay = product.image;
        this.productForm['image'].setValidators([]);
        this.productForm['image'].updateValueAndValidity();
      }),
      take(1),
    ).subscribe();
  }

  private updateProduct(productData: FormData) {
    this.productsService.updateProduct(productData, this.currentProductId).pipe(
      filter(Boolean),
      tap((product: Product) => this.messageService.add({severity: 'success', summary: 'Success', detail: `Product ${product.name} is updated`})),
      switchMap(() => this.timerBack$),
      catchError(() => of(this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product is not updated' }))),
      take(1),
    ).subscribe();
  }
}
