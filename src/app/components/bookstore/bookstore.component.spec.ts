import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookstoreComponent } from './bookstore.component';
import { MessageService } from 'primeng/api';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from '../../services/book.service';


describe('BookstoreComponent', () => {
  let component: BookstoreComponent;
  let fixture: ComponentFixture<BookstoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookstoreComponent,HttpClientTestingModule],
       providers: [MessageService,BookService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
