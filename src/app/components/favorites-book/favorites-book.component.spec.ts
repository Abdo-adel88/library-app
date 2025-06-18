import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesBookComponent } from './favorites-book.component';

describe('FavoritesBookComponent', () => {
  let component: FavoritesBookComponent;
  let fixture: ComponentFixture<FavoritesBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesBookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoritesBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
