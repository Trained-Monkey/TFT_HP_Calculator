import { Component, NgModule } from '@angular/core';
import { ItemDataService } from '../common/services/itemData.service';
import { ChampionDataService } from '../common/services/championData.service';
import { GraphGeneratorService } from '../common/services/graphGenerator.service';
import { Observable, filter, map, reduce, tap } from 'rxjs';
import { Champion, Item, Stats } from '../common/interfaces/interfaces';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})

export class CalculatorComponent {
  // Graphs
  options: any;
  mergeOption: any;
  loading: any;

  // Stats
  items: Observable<Item[]>;
  champions: Observable<Champion[]>;

  championImagePath: string;
  itemImagePaths: string[];

  selectedChampion: Champion;

  filteredChampions: Observable<Champion[]>;
  searchString: string = "";

  stats: Stats;

  // Inject champion and item service list through constructor
  constructor(private itemDataService: ItemDataService,
              private championDataService: ChampionDataService,
              private graphGeneratorService: GraphGeneratorService) {
    this.items = this.itemDataService.item;
    this.champions = this.championDataService.champion;
    this.filteredChampions = this.championDataService.filteredChampion;

    this.options = graphGeneratorService.options;
    this.mergeOption = graphGeneratorService.mergeOption;
    this.loading = graphGeneratorService.loading;

    this.stats = {
      health: 0,
      armour: 0,
      magicResist: 0
    }
  }

  selectChampion(champion: Champion): void {
    // Updated our this.stats
    this.stats.health = champion.health;
    this.stats.armour = champion.armour;
    this.stats.magicResist = champion.magicResist;

    this.selectedChampion = champion;
    this.championImagePath = "assets/images/" + champion.image;

    // Set and get stats and pass into the graph generator to update our graph
    this.graphGeneratorService.updateData(this.stats);
    this.mergeOption = this.graphGeneratorService.mergeOption;
  }

  selectItem(item: Item, slot: Number) : void {

  }

  searchChampions(): void {
    this.filteredChampions = this.championDataService.searchChampions(this.searchString);
  }
}
