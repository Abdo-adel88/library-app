import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-details-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-book.component.html',
  styleUrl: './details-book.component.css'
})
export class DetailsBookComponent {
  @Input() book: any;
    isMobileView = false;

  @HostListener('window:resize')
  onResize() {
    this.checkViewport();
  }

  ngOnInit() {
    this.checkViewport();
  }

  checkViewport() {
    this.isMobileView = window.innerWidth <= 428;
  }
}
