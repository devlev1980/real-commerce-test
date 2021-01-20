import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoreRoutingModule} from './core-routing.module';
import {HomeComponent} from './components/home/home.component';
import {AboutComponent} from './components/about/about.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HandleApiErrorsInterceptor} from './interceptors/handle-api-errors.interceptor';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {FormsModule} from '@angular/forms';
import {TimestampPipe} from './pipes/timestamp.pipe';
import {SearchPipe} from './pipes/search.pipe';
import {SortPipe} from './pipes/sort.pipe';


@NgModule({
  declarations: [HomeComponent, AboutComponent, TimestampPipe, SearchPipe, SortPipe],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    TabsModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HandleApiErrorsInterceptor,
      multi: true
    }
  ],
  exports: [HomeComponent, AboutComponent, TimestampPipe, SearchPipe, SortPipe]
})
export class CoreModule {
}
