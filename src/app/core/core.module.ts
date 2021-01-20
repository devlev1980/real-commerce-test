import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';


@NgModule({
  declarations: [HomeComponent, AboutComponent],
  imports: [
    CommonModule,
    CoreRoutingModule
  ]
})
export class CoreModule { }
