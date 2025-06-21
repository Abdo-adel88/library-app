import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeDBooksComponent } from './three-d-books.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from '../../services/book.service';

describe('ThreeDBooksComponent', () => {
  let component: ThreeDBooksComponent;
  let fixture: ComponentFixture<ThreeDBooksComponent>;

  beforeEach(async () => {
  await TestBed.configureTestingModule({
  imports: [ThreeDBooksComponent, HttpClientTestingModule],
  providers: [BookService]
}).compileComponents();

    
    fixture = TestBed.createComponent(ThreeDBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
