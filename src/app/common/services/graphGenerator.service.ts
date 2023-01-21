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


    series: [
      {
        // data: this.generateData(0),
        showSymbol: false,
        clip: true,
        type: 'line',
        emphasis: {
          focus: 'series'
        },

        // markLine: {
        //     data: [   [
        //       {name: 'start', xAxis: 2000, yAxis: 0},
        //       {name: 'end', xAxis: 2000, yAxis: 1},
        //     ]   ]
        // }
      },
      {
        showSymbol: false,
        clip: true,
        type: 'line'
      },
      {
        showSymbol: false,
        clip: true,
        type: 'line'
      },
    ],
  };

  mergeOption: any;
  loading = false;

  // Generates data to show graphically, modifier represents the armor/mr stat
  // Move into a service
  generateData(modifier: number) : number[] {
    var data = [];
    for (var i: number = 0; i < 2000; i+=10){
      data.push([i, i + i * modifier / 100]);
    }

    return data;
  }

  updateData(stats: Stats) {
    var updatedData = [];
    var flattenedData = [0, stats.armour, stats.magicResist];

    // Convert stats into effective HP data and format it for echarts
    updatedData = flattenedData.map((x) => ({['data']: this.generateData(x)}));

    this.mergeOption = {series: updatedData}
    return this.mergeOption
  }
}
