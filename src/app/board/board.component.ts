import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewGameDialogComponent } from '../new-game-dialog/new-game-dialog.component';
import { StoreServiceService } from '../store-service.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  squares: string[] = Array(9).fill('');
  xIsNext = true;
  winner = '';
  squaresFilled: number[] = Array(9).fill(0);
  moves = 0;

  constructor(public dialog: MatDialog, private storeServiceService: StoreServiceService) {}

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill('');
    this.xIsNext = true;
    this.winner = '';
    this.moves = 0;
    this.squaresFilled = Array(9).fill(0);
  }

  getPlayer() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number){
    if(this.squaresFilled[idx] === 0){
      this.squares[idx] = this.getPlayer();
      this.squaresFilled[idx] = 1;
      this.moves++;
      this.xIsNext = !this.xIsNext;
      if(this.calculateWinner()) {
        this.winner === 'X' ? this.storeServiceService.xWon() : this.storeServiceService.oWon();
        this.openWinnerDialog(false);
      } else if(this.moves === 9) {
        this.openWinnerDialog(true);
      }

    }
  }

  openWinnerDialog(restart: Boolean) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      winner: this.winner,
      restart: restart
    };
    const dialogRef = this.dialog.open(NewGameDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result?.action === 'new game') {
        this.newGame();
      }
    });
  }

  mouseEnter(idx: number) {
    if(this.squaresFilled[idx] === 0){
      this.squares[idx] = this.xIsNext ? 'X' : 'O';
    }
    for(let i=0;i<9;i++){
      if(i != idx) {
        this.mouseLeave(i);
      }
    }
  }

  mouseLeave(idx: number) {
    if(this.squaresFilled[idx] === 0){
      this.squares[idx] = '';
    }
  }

  calculateWinner() {
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
    for(let i=0;i<lines.length;i++){
      const [a,b,c] = lines[i];
      if(this.squares[a] &&
         this.squares[a] === this.squares[b] &&
         this.squares[a] === this.squares[c] 
        ) {
          this.winner = this.squares[a];
          return this.squares[a];
        }
    }
    return null;
  }

  
}
