import { Component, OnInit, effect, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { interval } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Component({
  selector: 'app-three-d-books',
  standalone: true,
  imports: [CommonModule, NavbarComponent,HttpClientTestingModule],
  templateUrl: './three-d-books.component.html',
  styleUrls: ['./three-d-books.component.css'],
})
export class ThreeDBooksComponent implements OnInit {
  private bookService = inject(BookService);

  romanceBooks = signal<any[]>([]);
  activeIndex = signal(0);

  ngOnInit(): void {
    this.bookService.getBooksBySubject('suspense', 20).subscribe((res: any) => {
      this.romanceBooks.set(res.works || []);
    });

    interval(3000).subscribe(() => {
      const total = this.romanceBooks().length;
      if (total > 0) {
        this.activeIndex.update(i => (i + 1) % total);
      }
    });
  }

  visibleBooks = computed(() => {
    const books = this.romanceBooks();
    const index = this.activeIndex();
    const total = books.length;

    if (total < 5) return books;

    const result = [];
    for (let i = -2; i <= 2; i++) {
      const idx = (index + i + total) % total;
      result.push(books[idx]);
    }
    return result;
  });

  getPositionClass(index: number): string {
    switch (index) {
      case 0: return 'far-left';
      case 1: return 'left';
      case 2: return 'center';
      case 3: return 'right';
      case 4: return 'far-right';
      default: return 'hidden';
    }
  }
}
