import { Injectable } from "@angular/core";
import { Observable, Subject, filter, share } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { of, find, map, shareReplay, tap } from "rxjs";
import { Champion } from "../interfaces/interfaces";

@Injectable({
    providedIn: 'root'
})

export class ChampionDataService {
  champion: Observable<Champion[]>;
  filteredChampion: Observable<Champion[]>;

  coutner: number;
  test = new Subject();

  constructor(private http: HttpClient) {
    this.champion = this.http.get<Champion[]>('api/champions.json').pipe(
      // Replay data onto new subscribers
      shareReplay(1)
    );
    this.filteredChampion = this.champion;
  }

  searchChampions(query) {
    return this.champion.pipe(
      map(champ => champ.filter(champ => champ.name.toLowerCase().indexOf(query.toLowerCase()) === 0)),
      shareReplay(1)
    )
  }
}

