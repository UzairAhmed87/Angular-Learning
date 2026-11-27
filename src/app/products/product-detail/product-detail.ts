import { Component, computed, inject, input, numberAttribute } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductsService } from '../products'; // fix path to your service file
import { CartService } from '../../cart/cart-service';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {
  // Must be named `id` to match :id in the route
  readonly id = input.required<number, string>({
    transform: numberAttribute,
  });
  private readonly productsService = inject(ProductsService);
  protected readonly isLoading = this.productsService.isLoading;
  private readonly cartService = inject(CartService);

  protected readonly product = computed(() =>
    this.productsService.getProductById(this.id()),
  );

  protected addToCart() {
    const product = this.product();
    if (product) {
      this.cartService.addToCart(product);
    }
  }
}