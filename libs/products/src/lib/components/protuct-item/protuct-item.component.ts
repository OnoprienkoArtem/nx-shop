import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from '@bluebits/products';
import { Product } from '../../models/product';

@Component({
  selector: 'products-product-item',
  templateUrl: './protuct-item.component.html',
  styles: [
  ]
})
export class ProtuctItemComponent implements OnInit {

  @Input() product: Product;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
  }

}
