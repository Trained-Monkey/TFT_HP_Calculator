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
      },
      {
        clip: true,
        type: 'line',
      },
      {
        clip: true,
        type: 'line',
      }
    ],
  };

  /*
   * markPoint does not seem to work
   */


  mergeOption: any;
  loading = false;

  // Generates data to show graphically, modifier represents the armor/mr stat
  // Move into a service
  generateData(modifier: number, hp: number = 0) : number[] {
    var data = [];
    let base = 2000;
    base = hp > base? hp + 1000 : base;
    data.push([0, 0]);
    data.push([base, base + base * modifier/ 100]);

    return data;
  }

  getPoint(modifier: number, hp: number = 0) : number[] {
    var data = [];
    data.push([hp, hp + hp * modifier/100]);

    return data;
  }


  updateData(stats: Stats) {
    var updatedData = [];
    var flattenedData = [stats.armour, stats.magicResist];

    // Convert stats into effective HP data and format it for echarts
    updatedData = flattenedData.map((x) => ({['data']: this.generateData(x, stats.health)}));
    updatedData.push(...flattenedData.map((x) => ({['data']: this.getPoint(x, stats.health)})));

    this.mergeOption = {series: updatedData}
    return this.mergeOption
  }
}
