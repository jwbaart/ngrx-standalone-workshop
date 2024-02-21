import { Injectable } from "@angular/core";
import { ProductService } from "./product.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as productListActions from "./product-list/actions";
import { catchError, exhaustMap, map, of } from "rxjs";
import { productApiActions } from "./actions";

@Injectable()
export class ProductEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly productsService: ProductService
  ) {}

  fetchProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productListActions.productsOpened),
      exhaustMap(() =>
        this.productsService.getProducts().pipe(
          map((products) =>
            productApiActions.productsFetchedSuccess({ products })
          ),
          catchError(() =>
            of(
              productApiActions.productsFetchedError({
                errorMessage: "Error Fetching Products",
              })
            )
          )
        )
      )
    );
  });
}
