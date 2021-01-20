import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoreRoutingModule} from './core-routing.module';
import {HomeComponent} from './components/home/home.component';
import {AboutComponent} from './components/about/about.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HandleApiErrorsInterceptor} from './interceptors/handle-api-errors.interceptor';
import {TabsModule} from 'ngx-bootstrap/tabs';


@NgModule({
  declarations: [HomeComponent, AboutComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    TabsModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HandleApiErrorsInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
}
