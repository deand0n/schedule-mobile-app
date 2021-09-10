import {Component, Input, OnInit} from '@angular/core';
import {Day} from '../../models/day.model';

@Component({
  selector: 'schedule-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  // @Input() day!: Day;

  constructor() { }

  ngOnInit(): void {
  }

}
