import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";

import { HttpClient } from "@angular/common/http";
import { BasicProduct, Product } from "@angular-monorepo/api-interfaces";

@Injectable({ providedIn: "root" })
export class ProductService {
  constructor(private readonly http: HttpClient) {}

  getProducts(): Observable<BasicProduct[]> {
    return this.http.get<BasicProduct[]>("/api/product/product-list").pipe(
      map((res) => {
        // if (Math.random() < 0.25) throw Error("products failed");
        return res;
      })
    );
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`/api/product/${id}`);
  }
}
