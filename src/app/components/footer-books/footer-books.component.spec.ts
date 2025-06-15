import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterBooksComponent } from './footer-books.component';

describe('FooterBooksComponent', () => {
  let component: FooterBooksComponent;
  let fixture: ComponentFixture<FooterBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterBooksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
