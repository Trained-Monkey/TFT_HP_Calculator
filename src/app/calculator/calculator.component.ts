import { Component, NgModule } from '@angular/core';
import { ItemDataService } from '../common/services/itemData.service';
import { ChampionDataService } from '../common/services/championData.service';
import { GraphGeneratorService } from '../common/services/graphGenerator.service';
import { Observable, filter, map, reduce, tap } from 'rxjs';
import { Champion, Item, Modifiers, Stats } from '../common/interfaces/interfaces';
import {FormControl, FormGroup} from '@angular/forms';
import { StatCalculatorService } from '../common/services/statCalculator.service';
import { ThemeOption } from 'ngx-echarts';
import { dark } from 'src/assets/theme/dark';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})

export class CalculatorComponent {

  statModifiers = new FormGroup({
    star: new FormControl(1),
    defender: new FormControl(0),
    aegis: new FormControl(0),
    brawler: new FormControl(0)
  });

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
  selectedItems: Item[];

  filteredChampions: Observable<Champion[]>;
  searchString: string = "";

  stats: Stats = {
    health: 0,
    armour: 0,
    magicResist: 0
  };
  theme: string | ThemeOption = dark;

  PHPGrowthArmour: number;
  PHPGrowthHealth: number;

  MHPGrowthMagicResist: number;
  MHPGrowthHealth: number;


  // Inject champion and item service list through constructor
  constructor(private itemDataService: ItemDataService,
              private championDataService: ChampionDataService,
              private graphGeneratorService: GraphGeneratorService,
              private statCalculatorService: StatCalculatorService) {
    this.items = this.itemDataService.item;
    this.champions = this.championDataService.champion;
    this.filteredChampions = this.championDataService.filteredChampion;

    this.options = graphGeneratorService.options;
    this.mergeOption = graphGeneratorService.mergeOption;
    this.loading = graphGeneratorService.loading;

    this.statModifiers.valueChanges.subscribe(() => this.refreshData());

    this.statCalculatorService.PHPGrowth.subscribe({
      next: (v: Stats) => {this.PHPGrowthArmour = v.armour; this.PHPGrowthHealth = v.health}
    })

    this.statCalculatorService.MHPGrowth.subscribe({
      next: (v: Stats) => {this.MHPGrowthMagicResist = v.magicResist; this.MHPGrowthHealth = v.health}
    })

    this.selectedItems = [null, null, null];
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
    this.refreshData();
  }

  selectItem(item: Item, slot: number) : void {
    this.selectedItems[slot] = item;
    this.refreshData();
  }

  // Might want to move all calculations into a service
  refreshData() : void {
    // Move form into modifier

    let modifiers: Modifiers = {
      star: this.statModifiers.value.star,
      defender: this.statModifiers.value.defender,
      aegis: this.statModifiers.value.aegis,
      anima: 0,
      brawler: 0
    }
    this.stats = this.statCalculatorService.calculateStats(this.selectedChampion, this.selectedItems, modifiers);

    // Update our graph
    if (this.selectedChampion) {
      this.mergeOption = this.graphGeneratorService.updateData(this.stats);
    }
  }

  searchChampions(): void {
    this.filteredChampions = this.championDataService.searchChampions(this.searchString);
  }
}
