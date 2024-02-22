import { Injectable } from "@angular/core";
import { ProductService } from "./product.service";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import * as productListActions from "./product-list/actions";
import {
  catchError,
  exhaustMap,
  filter,
  map,
  of,
  switchMap,
} from "rxjs";
import { productApiActions } from "./actions";
import { productDetailsActions } from "./product-details/actions";
import { Store } from "@ngrx/store";
import { selectCurrentProductId } from "./product.selectors";

@Injectable()
export class ProductEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly productsService: ProductService,
    private readonly store: Store
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

  fetchCurrentProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productDetailsActions.pageOpened),
      concatLatestFrom(() =>
        this.store
          .select(selectCurrentProductId)
          .pipe(filter((id): id is string => id != null))
      ),
      switchMap(([, id]) => {
        return this.productsService.getProduct(id).pipe(
          map((product) =>
            productApiActions.singleProductFetchedSuccess({ product })
          ),
          catchError(() =>
            of(
              productApiActions.singleProductFetchedError({
                errorMessage: "Error fetching single product",
              })
            )
          )
        );
      })
    );
  });
}
