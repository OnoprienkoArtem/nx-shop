import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ButtonModule } from 'primeng/button';
import { ProtuctItemComponent } from './components/product-item/product-item.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

export const productsRoutes: Routes = [
  {
    path: 'products',
    component: ProductsListComponent
  }
];

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(productsRoutes),
      ButtonModule,
      CheckboxModule,
      FormsModule,
    ],
    declarations: [
      ProductsSearchComponent,
      CategoriesBannerComponent,
      ProtuctItemComponent,
      FeaturedProductsComponent,
      ProductsListComponent,
    ],
    exports: [
      ProductsSearchComponent,
      CategoriesBannerComponent,
      ProtuctItemComponent,
      FeaturedProductsComponent,
      ProductsListComponent,
    ]
})
export class ProductsModule {}
