import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MockServerService } from './mock-server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // options = {

  //   xAxis: {
  //     name: 'x',
  //     minorTick: {
  //       show: true
  //     },
  //     minorSplitLine: {
  //       show: true
  //     },
  //   },

  //   yAxis: {
  //     type: 'value',
  //     name: 'Effective HP',
  //     min: 0,
  //     minorTick: {
  //       show: true
  //     },
  //     minorSplitLine: {
  //       show: true
  //     }
  //   },

  //   series: [
  //     {
  //       data: this.generateData(40),
  //       showSymbol: false,
  //       clip: true,
  //       type: 'line'
  //     },
  //     {
  //       data: this.generateData(10),
  //       showSymbol: false,
  //       clip: true,
  //       type: 'line'
  //     },
  //     {
  //       data: this.generateData(0),
  //       showSymbol: false,
  //       clip: true,
  //       type: 'line'
  //     },
  //   ],
  // };

  // mergeOption: any;
  // loading = false;

  // constructor(private api: MockServerService, private http: HttpClient) {}

  // getData() {
  //   this.loading = true;
  //   this.api
  //     .getData()
  //     .then((data) => {
  //       this.mergeOption = { series: [{ data }] };
  //     })
  //     .catch((e) => {
  //       /** Error Handler */
  //     })
  //     .then(() => {
  //       this.loading = false;
  //     });
  // }

  // generateData(modifier: number) {
  //   var data = [];
  //   for (var i: number = 0; i < 2000; i+=10){
  //     var result = [i, i + i * modifier / 100];
  //     data.push(result);
  //   }
  //   console.log(data);
  //   return data;
  // }
}
