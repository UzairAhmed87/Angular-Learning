import { Component, computed, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CartService } from '../cart-service';

@Component({
  selector: 'app-checkout',
  imports: [
    ReactiveFormsModule, // ← ngModel wali FormsModule nahi
    RouterLink,
    CurrencyPipe,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  protected readonly total = this.cartService.totalPrice;
  // totalPrice already computed signal — direct use OK

  protected readonly checkoutForm = new FormGroup({
    fullName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    address: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)],
    }),
  });
  protected readonly hasItems = computed(
    () => this.cartService.getCartItems().length > 0,
  );
  protected onSubmit() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched(); // errors dikhao
      return;
    }

    if (this.cartService.getCartItems().length === 0) {
      return;
    }

    const order = this.checkoutForm.getRawValue();
    console.log('Order placed:', order, 'Total:', this.total());

    this.cartService.clearCart();
    this.checkoutForm.reset();
    this.router.navigateByUrl('/products');
  }
}