import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-book-store',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    ToastModule,
    RippleModule,
    CardModule,
    CarouselModule,
  ],
  templateUrl: './bookstore.component.html',
  styleUrls: ['./bookstore.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookStoreComponent implements OnInit {
  romanceBooks: any[] = [];
  kidsBooks: any[] = [];
  thrillerBooks: any[] = [];
  responsiveOptions: any[] = [];

  constructor(
    private bookService: BookService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchBooksByCategory('romance', 'romanceBooks');
    this.fetchBooksByCategory('children', 'kidsBooks');
    this.fetchBooksByCategory('thrillers', 'thrillerBooks');

    this.responsiveOptions = [
      { breakpoint: '1024px', numVisible: 3, numScroll: 1 },
      { breakpoint: '768px', numVisible: 2, numScroll: 1 },
      { breakpoint: '560px', numVisible: 1, numScroll: 1 },
    ];
  }

  fetchBooksByCategory(subject: string, target: keyof BookStoreComponent) {
    this.bookService.getBooksBySubject(subject, 20).subscribe((res: any) => {
      this[target] = res.works;
      this.cdr.markForCheck();
    });
  }

  show() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Message Content',
    });
  }

  onBookSelect(event: any): void {
    // optional: handle click
  }
}
