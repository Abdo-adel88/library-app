import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookStoreComponent } from './components/bookstore/bookstore.component';
import { BookSearchComponent } from './components/book-search/book-search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BookStoreComponent,BookSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'book-store';
}
