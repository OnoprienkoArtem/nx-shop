import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavComponent } from './shared/nav/nav.component';

import { AccordionModule } from 'primeng/accordion';
import { ToastModule } from 'primeng/toast';

import { ProductsModule } from '@bluebits/products';
import { UiModule } from '@bluebits/ui';
import { HttpClientModule } from '@angular/common/http';
import { OrdersModule } from '@bluebits/orders';
import { UsersModule } from '@bluebits/users';

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    }
];

@NgModule({
    declarations: [
      AppComponent,
      HomePageComponent,
      HeaderComponent,
      FooterComponent,
      NavComponent,
    ],
    imports: [
      BrowserModule,
      RouterModule.forRoot(routes),
      AccordionModule,
      HttpClientModule,
      BrowserAnimationsModule,
      ProductsModule,
      UiModule,
      OrdersModule,
      ToastModule,
      UsersModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
