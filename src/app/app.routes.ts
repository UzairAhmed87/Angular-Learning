import { Routes } from '@angular/router';
import { ProductsGrid } from './products/products-grid/products-grid';
import { CartPage } from './cart/cart-page/cart-page';
import { ProductDetail } from './products/product-detail/product-detail';
import { Checkout } from './cart/checkout/checkout';
import { cartEmptyGuard } from './cart/cart-empty-guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  { path: 'products', component: ProductsGrid },
  { path: 'products/:id', component: ProductDetail },
  { path: 'cart', component: CartPage },
  {
    path: 'checkout',
    component: Checkout,
    canActivate: [cartEmptyGuard], // ← NEW
  },
  { path: '**', redirectTo: 'products' },
];