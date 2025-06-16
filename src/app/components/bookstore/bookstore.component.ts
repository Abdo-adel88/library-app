import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
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
     DetailsBookComponent
  ],
  templateUrl: './bookstore.component.html',
  styleUrls: ['./bookstore.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookStoreComponent implements OnInit {
  [key: string]: any; // Add index signature to allow dynamic property assignment
  allBooks: any[] = [];
  romanceBooks: any[] = [];
  kidsBooks: any[] = [];
  thrillerBooks: any[] = [];
selectedBook: any = null;
showDetailsDialog: boolean = false;

  selectedCategory: string = 'all';
  displayedBooks: any[] = [];
searchTerm: string = '';

  // Pagination
  page = 0;
  rows = 8;
  totalRecords = 0;
categoryOptions = [
  { label: 'All', value: 'all' },
  { label: 'Romance', value: 'romance' },
  { label: 'Kids', value: 'kids' },
  { label: 'Thrillers', value: 'thrillers' },
];

  constructor(
    private bookService: BookService,
    private cdr: ChangeDetectorRef
  ) {}

ngOnInit(): void {
  this.fetchBooks('romance'); // default category
  this.fetchBooks('children_stories', 'kidsBooks');
  this.fetchBooks('suspense', 'thrillerBooks');
  this.fetchBooks('fiction', 'allBooks');
}


fetchBooks(subject: string, target?: keyof BookStoreComponent): void {
  const key = target || (subject + 'Books') as keyof BookStoreComponent;

  this.bookService.getBooksBySubject(subject, 40).subscribe((res: any) => {
    this[key] = res.works;
    this.updateDisplayedBooks();
    this.cdr.markForCheck();
  });
}


updateDisplayedBooks(): void {
  let source =
    this.selectedCategory === 'romance'
      ? this.romanceBooks
      : this.selectedCategory === 'kids'
      ? this.kidsBooks
      : this.selectedCategory === 'thrillers'
      ? this.thrillerBooks
      : this.allBooks;

  // ✨ فلترة البحث
  if (this.searchTerm.trim()) {
    const term = this.searchTerm.trim().toLowerCase();
    source = source.filter(book =>
      book.title?.toLowerCase().includes(term) ||
      book.authors?.[0]?.name?.toLowerCase().includes(term) ||
      book.author?.toLowerCase().includes(term)
    );
  }

  this.totalRecords = source.length;
  const start = this.page * this.rows;
  const end = start + this.rows;
  this.displayedBooks = source.slice(start, end);
}


  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.page = 0;
    this.updateDisplayedBooks();
  }

  onPageChange(event: any): void {
    this.page = event.page;
    this.rows = event.rows;
    this.updateDisplayedBooks();
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

    console.log('Book details:', details);
    console.log('Author key:', authorKey);

    this.selectedBook = { ...book, ...details };

    if (authorKey) {
      this.bookService.getAuthorDetails(authorKey).subscribe((author) => {
        this.selectedBook.authorName = author?.name || 'Unknown';
        this.showDetailsDialog = true;
        this.cdr.markForCheck();
      });
    } else {
      this.selectedBook.authorName = 'Unknown';
      this.showDetailsDialog = true;
      this.cdr.markForCheck();
    }
  });
}



loadAuthorName(authorKey: string): void {
  this.bookService.getAuthorDetails(authorKey).subscribe((author: any) => {
    this.selectedBook.authorName = author?.name || 'Unknown';
    this.cdr.markForCheck(); // إذا كنت تستخدم ChangeDetectionStrategy.OnPush
  });
}


}
