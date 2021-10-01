import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-icon-picker',
  templateUrl: './icon-picker.component.html',
  styleUrls: ['./icon-picker.component.scss']
})
export class IconPickerComponent implements OnInit {

  @Input() iconNames!: string[];
  @Input() iconsPerPage = 10;
  @Output() selectedIcon: EventEmitter<string>;

  iconsByPages: string[][] = [];
  pagesAmount: number;
  currentPage = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.pagesAmount = Math.ceil(this.iconNames.length / this.iconsPerPage);
    this.calculateIconsPerPage();
  }

  counter(i: number): Array<number> {
    return Array(i).fill(0).map((x, index) => index);
  }

  private calculateIconsPerPage() {
    for (let i = 0; i < this.pagesAmount; i++) {
      this.iconsByPages.push([]);

      for (let j = 0; j < this.iconsPerPage; j++) {
        const iconIndex = j + i * this.iconsPerPage;

        if (!this.iconNames[iconIndex]) {
          return;
        }

        this.iconsByPages[i].push(this.iconNames[iconIndex]);
      }
    }
  }
}
