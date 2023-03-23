import { Injectable } from "@angular/core";
import { Stats } from "../interfaces/interfaces";

@Injectable({
  providedIn: 'root'
})

export class GraphGeneratorService{
  options = {
    xAxis: {
      name: 'HP',
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

    legend: {
      show: true,

    },

    series: [
      {
        showSymbol: false,
        clip: true,
        type: 'line',
        name: 'Effective Physical HP'
      },
      {
        showSymbol: false,
        clip: true,
        type: 'line',
        name: 'Effective Magical HP'
      }
    ],
  };

  mergeOption: any;
  loading = false;

  // Generates data to show graphically, modifier represents the armor/mr stat
  // Move into a service
  generateData(modifier: number, hp: number = 0) : number[] {
    var data = [];
    let base = 2000;
    hp += 1000;
    base = hp > base? hp : base;

    for (var i: number = 0; i < base; i+=10){
      data.push([i, i + i * modifier / 100]);
    }

    return data;
  }

  updateData(stats: Stats) {
    var updatedData = [];
    var flattenedData = [stats.armour, stats.magicResist];

    // Convert stats into effective HP data and format it for echarts
    updatedData = flattenedData.map((x) => ({['data']: this.generateData(x, stats.health)}));

    this.mergeOption = {series: updatedData}
    return this.mergeOption
  }
}
