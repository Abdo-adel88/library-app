import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MenubarModule, ButtonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  items: MenuItem[] = [];
  isScrolled: boolean = false;

  ngOnInit() {
    this.items = [
      { label: 'Home', icon: 'pi pi-home', routerLink: '/' },
      { label: 'Books', icon: 'pi pi-book', routerLink: '/books' },
      {
        label: 'Favorites',
        icon: 'pi pi-heart',
        command: () => {
          this.onFavoritesClick();
        },
      },
      { label: 'Contact', icon: 'pi pi-envelope', routerLink: '/contact' },
    ];
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }
  onFavoritesClick() {
    const event = new CustomEvent('open-favorites-dialog');
    window.dispatchEvent(event);
  }

scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}


}
