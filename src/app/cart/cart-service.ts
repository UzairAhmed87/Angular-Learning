import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../products/product';
import { CartItem } from './cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly cartItems = signal<CartItem[]>([]);
  readonly totalPrice = computed(() => {
    return this.cartItems().reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  });
  addToCart(product: Product) {
    this.cartItems.update(items => {
      const existingItem = items.find(item => item.product.id === product.id);
      if (existingItem) {
        return items.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...items, { product, quantity: 1 }];
    });
  }
  getCartItems() {
    return this.cartItems();
  }
  removeFromCart(product: Product) {
    this.cartItems.update((items) => {
      const existing = items.find((i) => i.product.id === product.id);
      if (!existing) return items;
  
      if (existing.quantity <= 1) {
        return items.filter((i) => i.product.id !== product.id);
      }
  
      return items.map((i) =>
        i.product.id === product.id
          ? { ...i, quantity: i.quantity - 1 }
          : i,
      );
    });
  }
  clearCart() {
    this.cartItems.set([]);
  }
}
