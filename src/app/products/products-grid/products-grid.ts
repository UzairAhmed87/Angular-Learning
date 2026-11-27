import { Component, computed, inject, signal } from '@angular/core';
import { ProductsCard } from '../products-card/products-card';
import { Product } from '../product';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CartService } from '../../cart/cart-service';
import { ProductsService } from '../products';

@Component({
  selector: 'app-products-grid',
  imports: [
    ProductsCard,
    MatIcon,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.scss',
})
export class ProductsGrid {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  protected readonly isLoading = this.productsService.isLoading;
protected readonly error = this.productsService.error;
  protected readonly searchTerm = signal('');
  
  protected readonly filteredProducts = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const products = this.productsService.getProducts();
  
    if (term === '') return products;
    return products.filter((p) => p.name.toLowerCase().includes(term));
  });
  protected onAddToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
