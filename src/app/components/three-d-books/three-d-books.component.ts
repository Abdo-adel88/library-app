import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-three-d-books',
  standalone: true,
  imports: [CommonModule],
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
    if (this.romanceBooks.length === 0) return [];

    const result = [];
    const total = this.romanceBooks.length;

    // Get 10 books: from activeIndex - 5 to activeIndex + 4
    for (let i = -5; i <= 4; i++) {
      const index = (this.activeIndex + i + total) % total;
      result.push(this.romanceBooks[index]);
    }

    return result;
  }

  getPositionClass(index: number): string {
    // This matches 10 items: index 0 to 9
    if (index <= 3) return 'far-left';
    if (index === 4) return 'left';
    if (index === 5) return 'center';
    if (index === 6) return 'right';
    if (index >= 7) return 'far-right';
    return 'hidden';
  }
}
