import { Component, inject, OnInit, Signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [NgIf],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  productId: number = 0;
  fetchedProductData = this.productService.fetchedProduct;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      this.productService.getById(this.productId);
    });
  }

  addToCart(product: Partial<IProduct>) {
    this.productService.cartList.update((prev) => [
      ...prev,
      product as IProduct,
    ]);
  }
}
