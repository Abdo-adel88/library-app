import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  computed,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-favorites-book',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './favorites-book.component.html',
  styleUrls: ['./favorites-book.component.css'],
})
export class FavoritesBookComponent {
  // ✅ Signal-based Input
  private _favoriteBooks = signal<any[]>([]);
  @Input() set favoriteBooks(value: any[]) {
    this._favoriteBooks.set(value || []);
  }
  get favoriteBooks() {
    return this._favoriteBooks();
  }

  // ✅ Emits stay as EventEmitters
  @Output() remove = new EventEmitter<any>();
  @Output() openDetails = new EventEmitter<any>();

  triggerRemove(book: any) {
    this.remove.emit(book);
  }

  triggerOpenDetails(book: any) {
    this.openDetails.emit(book);
  }

  // Optional: computed if needed later
  booksCount = computed(() => this._favoriteBooks().length);
}
