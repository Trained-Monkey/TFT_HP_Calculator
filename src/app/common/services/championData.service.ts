import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { find, map, shareReplay, tap } from "rxjs";
import { Champion } from "../interfaces/interfaces";

@Injectable({
    providedIn: 'root'
})

export class ChampionDataService {
  champion: Observable<Champion[]>;

  constructor(private http: HttpClient) {
    this.champion = this.http.get<Champion[]>('/api/champions.json').pipe(
      // Replay data onto new subscribers
      shareReplay(1)
    );
  }

  // Made redundant after just passing in champion class from document to component
  // Left in case of future use
  getChampionImagePath(championName: string): string {
    var selectedChampion:Champion = null;

    // Pipe does not run without a subscriber
    this.champion.pipe(
      tap((champions: Champion[]) => {
        selectedChampion = champions.find(x => x.name == championName);
      })
      // Surely theres a better way than having to run subscribe()?
    ).subscribe(() => {})

    if (selectedChampion != null)
    {
      return selectedChampion.image;
    }
    return "";
  }

  getChampionHealth(){

  }

  getChampionArmour(){

  }

  getChampionMagicResist(){

  }
}

