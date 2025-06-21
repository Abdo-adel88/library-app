import { Component } from '@angular/core';
import { BookstoreComponent } from './components/bookstore/bookstore.component';
import { ThreeDBooksComponent } from './components/three-d-books/three-d-books.component';
import { AboutBooksComponent } from './components/about-books/about-books.component';
import { FooterBooksComponent } from './components/footer-books/footer-books.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BookstoreComponent,ThreeDBooksComponent,AboutBooksComponent ,FooterBooksComponent,ContactUsComponent,ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'book-store';
}
