import { Component, NgModule } from '@angular/core';
import { ItemDataService } from '../common/services/itemData.service';
import { ChampionDataService } from '../common/services/championData.service';
import { GraphGeneratorService } from '../common/services/graphGenerator.service';
import { Observable, filter, map, reduce, tap } from 'rxjs';
import { Champion, Item, Modifiers, Stats } from '../common/interfaces/interfaces';
import { FormControl, FormGroup} from '@angular/forms';
import { StatCalculatorService } from '../common/services/statCalculator.service';
import { ThemeOption } from 'ngx-echarts';
import { dark } from 'src/assets/theme/dark';
import { ModifierService } from '../common/services/modifier.service';
import { DynamicFormComponent } from '../common/component/modifiers/modifier-dynamic-form.component';
import { ModifierControlService } from '../common/services/modifier-control.service';
import { ModifierBase } from '../common/component/modifiers/modifier-base';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  providers: [ModifierService, DynamicFormComponent, ModifierControlService ]
})

export class CalculatorComponent {

  statModifiers : FormGroup;

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
  filteredItems: Observable<Item[]>;

  championSearchString: string = "";
  itemSearchString: string = "";

  stats: Stats = {
    health: 0,
    armour: 0,
    magicResist: 0,
    PHP: 0,
    PHPGrowthArmour: 0,
    PHPGrowthHealth: 0,
    MHP: 0,
    MHPGrowthResist: 0,
    MHPGrowthHealth: 0
  };

  theme: string | ThemeOption = dark;

  PHPGrowthArmour: number;
  PHPGrowthHealth: number;
  PHP: number;

  MHPGrowthMagicResist: number;
  MHPGrowthHealth: number;
  MHP: number;

  questions$: Observable<ModifierBase<string>[]>;
  payload: string;

  // Inject champion and item service list through constructor
  constructor(private itemDataService: ItemDataService,
              private championDataService: ChampionDataService,
              private graphGeneratorService: GraphGeneratorService,
              private statCalculatorService: StatCalculatorService,
              private modifierService: ModifierService) {
    this.items = this.itemDataService.item;
    this.champions = this.championDataService.champion;
    this.filteredItems = this.itemDataService.filteredItem;
    this.filteredChampions = this.championDataService.filteredChampion;

    this.options = graphGeneratorService.options;
    this.mergeOption = graphGeneratorService.mergeOption;
    this.loading = graphGeneratorService.loading;

    this.statCalculatorService.finalisedStats.subscribe({
      next: (v: Stats) => {
        this.PHPGrowthArmour = v.PHPGrowthArmour;
        this.PHPGrowthHealth = v.PHPGrowthHealth;
        this.PHP = v.PHP;

        this.MHPGrowthMagicResist = v.MHPGrowthResist;
        this.MHPGrowthHealth = v.MHPGrowthHealth;
        this.MHP = v.MHP;
      }
    })

    this.selectedItems = [null, null, null];
    this.itemImagePaths = ['', '', ''];

    this.questions$ = modifierService.getQuestions();
  }

  receiveModifiers(form: FormGroup){
    this.statModifiers = form;
    this.statModifiers.valueChanges.subscribe(() => this.refreshData());
  }

  selectChampion(champion: Champion): void {
    // Updated our this.stats
    this.stats.health = champion.health;
    this.stats.armour = champion.armour;
    this.stats.magicResist = champion.magicResist;

    this.selectedChampion = champion;
    this.championImagePath = "assets/images/champions/" + champion.image;

    // Set and get stats and pass into the graph generator to update our graph
    this.graphGeneratorService.updateData(this.stats);
    this.mergeOption = this.graphGeneratorService.mergeOption;
    this.refreshData();
  }

  selectItem(item: Item, slot: number) : void {
    this.selectedItems[slot] = item;
    this.itemImagePaths[slot] = "assets/images/items/" + item.image;
    this.refreshData();
  }

  refreshData() : void {
    this.questions$ = this.modifierService.getNewQuestions(this.selectedChampion, this.selectedItems, this.statModifiers);
    // May need to call child component to get new info.

    let modifiers: Modifiers = {
      star: this.statModifiers.value.star,
      defender: this.statModifiers.value.defender,
      aegis: this.statModifiers.value.aegis,
      anima: this.statModifiers.value.anima,
      brawler: this.statModifiers.value.brawler,
      ionic: this.statModifiers.value.ionic,
      lastWhisper: this.statModifiers.value.lastWhisper,
      gargoyle: this.statModifiers.value.gargoyle,
      mech1: this.statModifiers.value.mech != undefined ? this.statModifiers.value.mech.mech1 : undefined,
      mech2: this.statModifiers.value.mech != undefined ? this.statModifiers.value.mech.mech2 : undefined,
      oxforce: this.statModifiers.value.oxforce
    }

    this.stats = this.statCalculatorService.calculateStats(this.selectedChampion, this.selectedItems, modifiers);

    // Update our graph
    if (this.selectedChampion) {
      this.mergeOption = this.graphGeneratorService.updateData(this.stats);
    }
  }

  searchChampions(): void {
    this.filteredChampions = this.championDataService.searchChampions(this.championSearchString);
  }

  searchItems(): void {
    this.filteredItems = this.itemDataService.searchItems(this.itemSearchString);
  }
}
