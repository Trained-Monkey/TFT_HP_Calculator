import { Component, NgModule } from '@angular/core';
import { ItemDataService } from '../common/services/itemData.service';
import { ChampionDataService } from '../common/services/championData.service';
import { Observable } from 'rxjs';
import { Champion, Item } from '../common/interfaces/interfaces';

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

  items: Observable<Item[]>;
  champions: Observable<Champion[]>;
  championImagePath: string;
  itemImagePaths: string[];

  // Inject champion and item service list through constructor
  constructor(private itemDataService: ItemDataService, private championDataService: ChampionDataService) {
    this.items = this.itemDataService.item;
    this.champions = this.championDataService.champion;
  }

  // Called everytime this.stats is changed
  updateData() {
    var updatedData = [];

    // Convert stats into effective HP data and format it for echarts
    updatedData = this.stats.map((x) => ({['data']: this.generateData(x)}));

    this.mergeOption = {series: updatedData}
  }

  // Generates data to show graphically, modifier represents the armor/mr stat
  generateData(modifier: number) : number[] {
    var data = [];
    for (var i: number = 0; i < 2000; i+=10){
      data.push([i, i + i * modifier / 100]);
    }

    return data;
  }

  selectChampion(champion: Champion): void {
    this.championImagePath = "assets/images/" + champion.image;
    // Set stats as well
  }
}
