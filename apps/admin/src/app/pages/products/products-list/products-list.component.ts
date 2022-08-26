import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@bluebits/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {

  products = [];

  constructor(
    private productService: ProductsService,
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchCategories();
  }

  updateProduct(product: Product): void {
    this.router.navigateByUrl(`products/form/${product.id}`);
  }

  deleteProduct(product: Product): void {
    this.confirmationService.confirm({
      message: `Do you want to delete this '${product.name}' product?`,
      header: `Delete '${product.name}' product`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(product.id).subscribe({
          next: () => {
            this.messageService.add({severity: 'success', summary: 'Success', detail: `Product ${product.name} is deleted`});
            this.fetchCategories();
          },
          error: () => this.messageService.add({severity: 'success', summary: 'Success', detail: 'Product is not deleted'})
        });
      },      
    });
  } 

  private fetchCategories(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }
}
