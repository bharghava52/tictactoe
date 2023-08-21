import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent {
  @Input() buttonValue = "";

  getButtonStyle() {
    if(this.buttonValue === 'O' || this.buttonValue === 'o') return {
      'background-color':'#f2185b'
    };
    else if(this.buttonValue == 'X' || this.buttonValue == 'x') return {
      'background-color':'#00dac5'
    };
    else return {
      'background-color':'#680db8'
    };
  }
}
