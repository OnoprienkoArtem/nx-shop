import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html'
})
export class ProtuctItemComponent implements OnInit {

  @Input() product!: Product;

  constructor() {}

  ngOnInit(): void {
    console.log(this.product);


  }

}
