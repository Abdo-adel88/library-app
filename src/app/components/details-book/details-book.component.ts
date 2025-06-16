import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-details-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-book.component.html',
  styleUrl: './details-book.component.css'
})
export class DetailsBookComponent {
  @Input() book: any;
}
