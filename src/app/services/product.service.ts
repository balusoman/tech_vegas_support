import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IProduct } from '../models/model';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  api_url = 'https://fakestoreapi.com/products';

  http = inject(HttpClient);

  catogories = signal<string[]>([]);
  products = signal<IProduct[]>([]);
  fetchedProduct = signal<Partial<IProduct>>({});
  cartList = signal<IProduct[]>([]);
  allProducts = signal<IProduct[]>([]);
  selectedCategory = signal<string>('');

  currentPage = signal<number>(1);

  constructor() {
    this.getCatoegories();
    this.getAll();
  }

  getCatoegories() {
    this.http.get<string[]>(`${this.api_url}/categories`).subscribe((data) => {
      this.catogories.set(data);
    });
  }

  getAll() {
    this.http.get<IProduct[]>(this.api_url).subscribe((data) => {
      this.products.set(data);
      this.allProducts.set(data);
    });
  }

  getByCategory(category: string) {
    this.selectedCategory.set(category);
    this.products.set([]);
    this.http
      .get<IProduct[]>(`${this.api_url}/category/${category}`)
      .pipe(take(1))
      .subscribe((data) => {
        this.products.update(() => data);
      });
  }

  getById(id: number) {
    this.fetchedProduct.set({});
    this.http.get<IProduct>(`${this.api_url}/${id}`).subscribe((data) => {
      this.fetchedProduct.set(data);
    });
  }
}
