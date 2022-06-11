import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({ width: '{{progressBarWidth}}%', }),
        { params: { progressBarWidth: 0 } }),
      state('closed', style({
        width: '100%',
      })),
      transition('* => open', [
        animate('1s ease-in-out')
      ]),
      transition('* => closed', [
        animate('0.5s')
      ]),
    ]),
  ]
})
export class ProgressBarComponent implements OnInit {

  @Input() progressWantedPercent: number = 0
  animState: string = "closed"

  constructor() { }

  ngOnInit(): void {
    this.animState = "open"
  }

}
