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
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';

export const productsRoutes: Routes = [
  {
    path: 'products',
    component: ProductsListComponent
  },
  {
    path: 'category/:categoryid',
    component: ProductsListComponent
  },
  {
    path: 'products/:productId',
    component: ProductDetailsComponent
  }
];

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(productsRoutes),
      ButtonModule,
      CheckboxModule,
      FormsModule,
      RatingModule,
      InputNumberModule,

    ],
    declarations: [
      ProductsSearchComponent,
      CategoriesBannerComponent,
      ProtuctItemComponent,
      FeaturedProductsComponent,
      ProductsListComponent,
      ProductDetailsComponent,
    ],
    exports: [
      ProductsSearchComponent,
      CategoriesBannerComponent,
      ProtuctItemComponent,
      FeaturedProductsComponent,
      ProductsListComponent,
      ProductDetailsComponent,
    ]
})
export class ProductsModule {}
