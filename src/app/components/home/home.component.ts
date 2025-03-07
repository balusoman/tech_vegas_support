import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { IProduct } from '../../models/model';

@Component({
  selector: 'app-home',
  imports: [NgFor, NgClass, NgIf, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  productService = inject(ProductService);
  router = inject(Router);
  categories = this.productService.catogories;
  productsList = this.productService.products;
  selectedCategory = this.productService.selectedCategory;

  currentPage = this.productService.currentPage();
  itemsPerPage: number = 8;

  get paginatedProducts(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.productsList().slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.productsList().length) {
      this.currentPage++;
      this.productService.currentPage.set(this.currentPage);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.productService.currentPage.set(this.currentPage);
    }
  }

  getByCategory(category: string) {
    if (category !== this.productService.selectedCategory()) {
      this.productService.getByCategory(category);
      this.currentPage = 1;
      this.productService.currentPage.set(this.currentPage);
    } else {
      this.productService.products.update(() =>
        this.productService.allProducts()
      );
      this.productService.selectedCategory.set('');
    }
  }

  addToCart(product: IProduct) {
    this.productService.cartList.update((prev) => [
      ...prev,
      product as IProduct,
    ]);
  }
}
