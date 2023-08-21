import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  squares: string[] = Array(9).fill('');
  xIsNext = true;
  winner = "";
  squaresFilled: number[] = Array(9).fill(0);

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill('');
    this.xIsNext = true;
    this.winner = "";
    this.squaresFilled = Array(9).fill(0);
  }

  getPlayer() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number){
    if(this.squaresFilled[idx] === 0){
      this.squares[idx] = this.getPlayer();
      this.squaresFilled[idx] = 1;
      this.xIsNext = !this.xIsNext;
    }
    this.winner = this.calculateWinner() ? `the winner is ` + this.calculateWinner() : '';
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
          return this.squares[a];
        }
    }
    return null;
  }

  
}
