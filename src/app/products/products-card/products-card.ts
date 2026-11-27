import { Component, input, Input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../product';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-products-card',
  imports: [MatCardModule, MatButtonModule, MatIcon, RouterLink, CurrencyPipe],
  templateUrl: './products-card.html',
  styleUrl: './products-card.scss',
})
export class ProductsCard {
 readonly product = input.required<Product>();
 readonly addButtonLabel = input<string>('Add to Cart');
 readonly addToCart = output<Product>();
 protected onAddToCart() {
  this.addToCart.emit(this.product());
 }
}
