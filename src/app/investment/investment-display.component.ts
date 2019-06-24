import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Investment } from '../models/investment';

@Component({
  selector: 'app-investment-display',
  templateUrl: './investment-display.component.html',
  styleUrls: ['./investment-display.component.css']
})
export class InvestmentDisplayComponent {
  @Input() model: Investment;
  @Output() edit = new EventEmitter();
  onEdit() { this.edit.emit(); }
}
