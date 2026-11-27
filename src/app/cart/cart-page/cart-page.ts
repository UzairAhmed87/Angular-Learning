import { Component, computed, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../cart-service';
import { Product } from '../../products/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  imports: [MatButtonModule, MatIconModule, CurrencyPipe,RouterLink],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss',
})
export class CartPage {
  private readonly cartService = inject(CartService);

  protected readonly items = computed(() => this.cartService.getCartItems());
  protected readonly total = computed(() => this.cartService.totalPrice());

  protected increase(product: Product) {
    this.cartService.addToCart(product);
  }

  protected decrease(product: Product) {
    this.cartService.removeFromCart(product);
  }

  protected clear() {
    this.cartService.clearCart();
  }
}