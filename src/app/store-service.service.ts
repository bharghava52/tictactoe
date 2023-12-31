import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreServiceService {

  private wins = [0,0];
  constructor() { }

  getWins() {
    return this.wins;
  }

  xWon() {
    this.wins[0]++;
  }

  oWon() {
    this.wins[1]++;
  }

  onResetWins() {
    this.wins = [0,0];
  }
}
