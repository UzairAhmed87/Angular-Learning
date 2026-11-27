import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CartService } from './cart-service';

export const cartEmptyGuard: CanActivateFn = () => {
  const cartService = inject(CartService);
  const router = inject(Router);

  if (cartService.getCartItems().length > 0) {
    return true; // allow checkout
  }

  // block + redirect
  return router.createUrlTree(['/cart']);
};