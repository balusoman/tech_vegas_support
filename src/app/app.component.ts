import { Component, computed, inject, Signal, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProductService } from './services/product.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { IProduct } from './models/model';
import { retry } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, FormsModule, NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  productService = inject(ProductService);
  router = inject(Router);

  isDropdownOpen: boolean = false;

  searchItem = signal<string>('');

  filteredProducts = computed(() => {
    if (this.searchItem().trim() !== '') {
      return this.productService
        .allProducts()
        .filter((item) =>
          item.title.toLowerCase().includes(this.searchItem().toLowerCase())
        );
    } else {
      return [];
    }
  });

  viewProduct(id: number) {
    this.searchItem.set('');
    this.router.navigate(['/product', id]);
  }

  showDropdown() {
    this.isDropdownOpen = true;
  }

  hideDropdown() {
    setTimeout(() => {
      this.isDropdownOpen = false;
    }, 150);
  }
}
