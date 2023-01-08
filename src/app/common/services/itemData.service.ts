import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ItemDataService {
  item: Observable<any[]>;

  constructor(private http: HttpClient) {
    this.item = this.http.get<any[]>('/api/items.json').pipe(
      map(pokemon => pokemon.map(p => p)),
      shareReplay(1)
    );
  }
}
