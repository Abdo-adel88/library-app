import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  HostListener,
  signal,
  computed,
  
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DetailsBookComponent } from '../details-book/details-book.component';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { FavoritesBookComponent } from '../favorites-book/favorites-book.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Component({
  selector: 'app-book-store',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    PaginatorModule,
    FormsModule,
    RadioButtonModule,
    DialogModule,
    DetailsBookComponent,
    FavoritesBookComponent,
    HttpClientTestingModule,
    
  ],
  templateUrl: './bookstore.component.html',
  styleUrls: ['./bookstore.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookstoreComponent implements OnInit {
  allBooks = signal<any[]>([]);
  romanceBooks = signal<any[]>([]);
  kidsBooks = signal<any[]>([]);
  thrillerBooks = signal<any[]>([]);

  selectedBook = signal<any | null>(null);
  showDetailsDialog = signal(false);
  selectedCategory = signal('all');
  searchTerm = signal('');
  showFavoritesDialog = signal(false);
  page = signal(0);
  rows = signal(8);
  yourFavoritesList = signal<any[]>([]);

  
  totalRecords = computed(() => this.filteredBooks().length);
  displayedBooks = computed(() => {
    const start = this.page() * this.rows();
    return this.filteredBooks().slice(start, start + this.rows());
  });

  categoryOptions = [
    { label: 'All', value: 'all' },
    { label: 'Romance', value: 'romance' },
    { label: 'Kids', value: 'kids' },
    { label: 'Thrillers', value: 'thrillers' },
  ];

  constructor(
    private bookService: BookService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.fetchBooks('romance', this.romanceBooks);
    this.fetchBooks('children_stories', this.kidsBooks);
    this.fetchBooks('suspense', this.thrillerBooks);
    this.fetchBooks('fiction', this.allBooks);
this.selectedCategory.set('all');

  }

fetchBooks(subject: string, signalTarget: any, callback?: () => void): void {
  this.bookService.getBooksBySubject(subject, 40).subscribe((res: any) => {
    signalTarget.set(res.works);
    if (callback) callback();
  });
}


  filteredBooks = computed(() => {
    const category = this.selectedCategory();
    const term = this.searchTerm().trim().toLowerCase();

    let source =
      category === 'romance'
        ? this.romanceBooks()
        : category === 'kids'
        ? this.kidsBooks()
        : category === 'thrillers'
        ? this.thrillerBooks()
        : this.allBooks();

    if (term) {
      source = source.filter(
        (book) =>
          book.title?.toLowerCase().includes(term) ||
          book.authors?.[0]?.name?.toLowerCase().includes(term) ||
          book.author?.toLowerCase().includes(term)
      );
    }

    return source;
  });

  onCategoryChange(category: string): void {
    this.selectedCategory.set(category);
    this.page.set(0);
  }

onPageChange(event: any): void {
  this.page.set(event.page);
  this.rows.set(event.rows);

  
  const el = document.getElementById('bookstore-top');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}


  getShortTitle(title: string): string {
    if (!title) return 'Untitled';
    const clean = title.trim().split(/\s+/).slice(0, 2).join(' ');
    return clean.length > 11 ? clean.slice(0, 11) + '...' : clean;
  }

  getShortAuthor(book: any): string {
    const author = book.authors?.[0]?.name || book.author || 'Unknown Author';
    const clean = author.trim().split(/\s+/).slice(0, 2).join(' ');
    return clean.length > 11 ? clean.slice(0, 11) + '...' : clean;
  }

  openBookDetails(book: any): void {
    this.bookService.getBookDetails(book.key).subscribe((details) => {
      const authorKey = details.authors?.[0]?.author?.key;
      const fullBook = { ...book, ...details };

      if (authorKey) {
        this.bookService.getAuthorDetails(authorKey).subscribe((author) => {
          fullBook.authorName = author?.name || 'Unknown';
          this.selectedBook.set(fullBook);
          this.showDetailsDialog.set(true);
        });
      } else {
        fullBook.authorName = 'Unknown';
        this.selectedBook.set(fullBook);
        this.showDetailsDialog.set(true);
      }
    });
  }

  addToFavorites(book: any) {
    if (book.authorName) {
      this.pushToFavorites(book);
    } else {
      const authorKey =
        book.authors?.[0]?.author?.key || book.authors?.[0]?.key;

      if (authorKey) {
        this.bookService.getAuthorDetails(authorKey).subscribe((author) => {
          book.authorName = author?.name || 'Unknown';
          this.pushToFavorites(book);
        });
      } else {
        book.authorName = 'Unknown';
        this.pushToFavorites(book);
      }
    }
  }

  pushToFavorites(book: any) {
    const exists = this.yourFavoritesList().some((b) => b.key === book.key);
    if (!exists) {
      this.yourFavoritesList.update((list) => [...list, book]);
      this.messageService.add({
        severity: 'success',
        summary: 'Added to Favorites',
        detail: book.title,
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Already in Favorites',
        detail: book.title,
      });
    }
  }

  removeFromFavorites(book: any) {
    this.yourFavoritesList.update((list) =>
      list.filter((b) => b.key !== book.key)
    );
    this.messageService.add({
      severity: 'info',
      summary: 'Removed from Favorites',
      detail: book.title,
    });
  }

  isInFavorites(book: any): boolean {
    return this.yourFavoritesList().some((b) => b.key === book.key);
  }

  @HostListener('window:open-favorites-dialog', [])
  openFavoritesFromNavbar() {
    this.showFavoritesDialog.set(true);
  }
}
