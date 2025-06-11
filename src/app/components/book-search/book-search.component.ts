import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
} from 'rxjs/operators';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [CommonModule,CardModule, ToastModule],
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css'],
})
export class BookSearchComponent implements OnInit {
  allBooks: any[] = [];
  books: any[] = [];
  search$ = new Subject<string>();

  constructor(private bookService: BookService,   private messageService: MessageService,) {}

  ngOnInit(): void {
    this.bookService.searchBooks('programming').subscribe((data) => {
      this.allBooks = data;
      this.books = data;
    });

    this.search$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        startWith(''),
        map((searchTerm) =>
          this.allBooks.filter((book) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      )
      .subscribe((filtered) => {
        this.books = filtered;
      });
  }

  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.search$.next(value);
  }

  trackByTitle(index: number, book: any): string {
    return book.title;
  }
    show() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Message Content',
    });
  }
}
