import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Item } from "../interfaces/interfaces";

@Injectable({
  providedIn: 'root'
})

// Simulates http call backend API.
export class ItemDataService {
  item: Observable<Item[]>;

  constructor(private http: HttpClient) {
    this.item = this.http.get<Item[]>('/api/items.json').pipe(
      // Replay data onto new subscribers
      shareReplay(1)
    );
  }
}
