import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './book-list.component.html',
})
export class BookListComponent {
  @Input() books: any[] = [];
  @Output() select = new EventEmitter<any>();

  trackByTitle(index: number, book: any) {
    return book.title;
  }
}
