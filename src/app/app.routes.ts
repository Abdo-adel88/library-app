import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
         import('./components/three-d-books/three-d-books.component').then(
        (m) => m.ThreeDBooksComponent
      ),
  },
  {
    path: 'books',
    loadComponent: () =>
      import('./components/bookstore/bookstore.component').then(
        (m) => m.BookstoreComponent
      ),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./components/about-books/about-books.component').then(
        (m) => m.AboutBooksComponent
      ),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./components/contact-us/contact-us.component').then(
        (m) => m.ContactUsComponent
      ),
  },
  {
    path: '3d-books',
    loadComponent: () =>
      import('./components/three-d-books/three-d-books.component').then(
        (m) => m.ThreeDBooksComponent
      ),
  },
];
