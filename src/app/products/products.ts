import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, tap } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly http = inject(HttpClient);

  private readonly errorMessage = signal<string | null>(null);
  private readonly loading = signal(true);

  // Observable → Signal
  private readonly products = toSignal(
    this.http.get<Product[]>('/products.json').pipe(
      tap(() => {
        this.loading.set(false);
        this.errorMessage.set(null);
      }),
      catchError((err) => {
        console.error(err);
        this.loading.set(false);
        this.errorMessage.set('Could not load products.');
        return of([] as Product[]); // app crash na ho
      }),
    ),
    { initialValue: [] as Product[] },
  );

  readonly isLoading = this.loading.asReadonly();
  readonly error = this.errorMessage.asReadonly();

  getProducts() {
    return this.products();
  }

  getProductById(id: number) {
    return this.products().find((p) => p.id === id);
  }
}