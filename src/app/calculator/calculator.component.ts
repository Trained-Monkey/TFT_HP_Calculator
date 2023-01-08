import { Component, NgModule } from '@angular/core';
import { MockServerService } from '../mock-server.service';
import { ItemDataService } from '../common/services/itemData.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})

export class CalculatorComponent {
  options = {
    xAxis: {
      name: 'x',
      minorTick: {
        show: true
      },
      minorSplitLine: {
        show: true
      },
    },

    yAxis: {
      type: 'value',
      name: 'Effective HP',
      min: 0,
      minorTick: {
        show: true
      },
      minorSplitLine: {
        show: true
      }
    },

    series: [
      {
        data: this.generateData(40),
        showSymbol: false,
        clip: true,
        type: 'line'
      },
      {
        data: this.generateData(10),
        showSymbol: false,
        clip: true,
        type: 'line'
      },
      {
        data: this.generateData(0),
        showSymbol: false,
        clip: true,
        type: 'line'
      },
    ],
  };

  stats = [0, 40, 50]

  mergeOption: any;
  loading = false;

  items: Observable<any[]>;

  // Inject champion and item service list through constructor
  constructor(private itemDataService: ItemDataService) {
    this.items = this.itemDataService.item;
    console.log(this.items)
  }

  // Called everytime this.stats is changed
  updateData() {
    var updatedData = [];

    // Convert stats into effective HP data and format it for echarts
    updatedData = this.stats.map((x) => ({['data']: this.generateData(x)}));

    this.mergeOption = {series: updatedData}
  }

  // timer = setInterval(() => {this.updateData()}, 1000);

  // ngOnDestroy(){
  //   clearInterval(this.timer);
  // }

  // Generates data to show graphically, modifier represents the armor/mr stat
  generateData(modifier: number) : number[] {
    var data = [];
    for (var i: number = 0; i < 2000; i+=10){
      data.push([i, i + i * modifier / 100]);
    }

    return data;
  }
}
