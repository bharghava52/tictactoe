import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StoreServiceService } from '../store-service.service';


@Component({
  selector: 'app-new-game-dialog',
  templateUrl: './new-game-dialog.component.html',
  styleUrls: ['./new-game-dialog.component.scss'],
})
export class NewGameDialogComponent implements OnInit {

  winner = '';
  xwins = 0;
  owins = 0;
  reset = false;
  constructor(
    public dialogRef: MatDialogRef<NewGameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private storeServiceService: StoreServiceService
  ) {}

  ngOnInit(): void {
    if(this.data) {
      this.winner = this.data.winner;
      this.reset = this.data.restart;
      [this.xwins,this.owins] = this.storeServiceService.getWins();
    }
  }

  onYesClick(): void {
    this.dialogRef.close({
      action: 'new game'
    });
  }

  onResetClick(): void {
    this.storeServiceService.onResetWins();
    this.onYesClick();
  }
}
