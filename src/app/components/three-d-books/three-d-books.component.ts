import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-three-d-books',
  standalone: true,
  imports: [CommonModule,NavbarComponent],
  templateUrl: './three-d-books.component.html',
  styleUrls: ['./three-d-books.component.css'],
})
export class ThreeDBooksComponent implements OnInit {
  romanceBooks: any[] = [];
  activeIndex = 0;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooksBySubject('romance', 20).subscribe((res: any) => {
      this.romanceBooks = res.works;
    });

    setInterval(() => {
      this.activeIndex = (this.activeIndex + 1) % this.romanceBooks.length;
    }, 3000);
  }

getVisibleBooks(): any[] {
  if (this.romanceBooks.length < 5) return this.romanceBooks;

  const total = this.romanceBooks.length;
  const result = [];

  // فقط 5 كتب: far-left, left, center, right, far-right
  for (let i = -2; i <= 2; i++) {
    const index = (this.activeIndex + i + total) % total;
    result.push(this.romanceBooks[index]);
  }

  return result;
}

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
