import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ButtonModule } from 'primeng/button';
import { ProtuctItemComponent } from './components/product-item/product-item.component';

export const productsRoutes: Route[] = [];

@NgModule({
    imports: [CommonModule, RouterModule, ButtonModule],
    declarations: [
      ProductsSearchComponent,
      CategoriesBannerComponent,
      ProtuctItemComponent,
      FeaturedProductsComponent,
    ],
    exports: [
      ProductsSearchComponent,
      CategoriesBannerComponent,
      ProtuctItemComponent,
      FeaturedProductsComponent,
    ]
})
export class ProductsModule {}
