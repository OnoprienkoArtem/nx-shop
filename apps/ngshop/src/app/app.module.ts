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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OrdersModule } from '@bluebits/orders';
import { JwtInterceptor, UsersModule } from '@bluebits/users';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

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
      StoreModule.forRoot({}),
      EffectsModule.forRoot([]),
      BrowserAnimationsModule,
      ProductsModule,
      UiModule,
      OrdersModule,
      ToastModule,
      UsersModule,
    ],
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true,
      }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
