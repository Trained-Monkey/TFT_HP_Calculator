import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NgxEchartsModule } from 'ngx-echarts';

import { AppComponent } from './app.component';

import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent

} from 'echarts/components';
// Import the Canvas renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
  CanvasRenderer
} from 'echarts/renderers';
import { CalculatorComponent } from './calculator/calculator.component';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './common/component/modifiers/modifier-dynamic-form.component';
import { DynamicFormQuestionComponent } from './common/component/modifiers/modifier-form.component';

echarts.use(
  [TitleComponent, TooltipComponent, GridComponent, LineChart, CanvasRenderer, LegendComponent]
);

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgxEchartsModule.forRoot({ echarts }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
