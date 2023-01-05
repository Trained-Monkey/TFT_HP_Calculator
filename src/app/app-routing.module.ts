import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import { AppComponent } from './app.component';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts/core';


export const routes: Routes = [
  { path: '', component: CalculatorComponent },
  // { path: '', component: AppComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModules { }
