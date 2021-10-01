import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-tab-settings',
  templateUrl: './tab-settings.component.html',
  styleUrls: ['./tab-settings.component.scss']
})
export class TabSettingsComponent implements OnInit {

  iconNames: string[] = [
    'trophy',
    'today',
    'terminal',
    'thumbs-down',
    'thumbs-up',
    'sparkles',
    'star-half',
    'shield',
    'shapes',
    'rose',
    'rocket',
    'sad',
    'pizza',
    'planet',
    'nuclear',
    'leaf',
    'ice-cream',
    'heart',
    'happy',
    'flask',
    'flash',
    'flag',
    'egg',
    'diamond',
    'triangle',
    'ellipse',
    'square'
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
