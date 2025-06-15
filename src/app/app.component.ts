import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookStoreComponent } from './components/bookstore/bookstore.component';
import { BookSearchComponent } from './components/book-search/book-search.component';
import { ThreeDBooksComponent } from './components/three-d-books/three-d-books.component';
import { AboutBooksComponent } from './components/about-books/about-books.component';
import { FooterBooksComponent } from './components/footer-books/footer-books.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BookStoreComponent,BookSearchComponent,ThreeDBooksComponent,AboutBooksComponent,FooterBooksComponent,ContactUsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'book-store';
}
