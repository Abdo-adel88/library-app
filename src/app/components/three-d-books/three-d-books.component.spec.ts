import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeDBooksComponent } from './three-d-books.component';

describe('ThreeDBooksComponent', () => {
  let component: ThreeDBooksComponent;
  let fixture: ComponentFixture<ThreeDBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreeDBooksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThreeDBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
