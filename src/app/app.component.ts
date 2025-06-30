import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';

// استيراد المكونات التي تستخدمها في القالب
import { ThreeDBooksComponent } from './components/three-d-books/three-d-books.component';
import { BookstoreComponent } from './components/bookstore/bookstore.component';
import { AboutBooksComponent } from './components/about-books/about-books.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FooterBooksComponent } from './components/footer-books/footer-books.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ToastModule,         // فقط المكتبات المشتركة مثل ToastModule
    RouterModule,        // إذا كنت تستخدم التوجيه
    ThreeDBooksComponent,  // إضافة المكونات هنا
    BookstoreComponent,
    AboutBooksComponent,
    ContactUsComponent,
    FooterBooksComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'book-store';
}
