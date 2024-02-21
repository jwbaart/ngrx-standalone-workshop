import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CartService } from "./cart.service";
import { cartActions } from "./actions";
import { cartDetailsActions } from "./cart-details/actions";
import { catchError, map, of, switchMap, timer } from "rxjs";

const REFRESH_CART_ITEMS_INTERVAL_MS = 20_000;

export const fetchCartItems = createEffect(
  () => {
    const cartService = inject(CartService);

    return inject(Actions).pipe(
      ofType(
        cartActions.timerTick,
        cartDetailsActions.pageOpened,
        cartDetailsActions.purchaseSuccess
      ),
      switchMap(() =>
        cartService.getCartProducts().pipe(
          map((cartItems) => cartActions.fetchCartItemsSuccess({ cartItems })),
          catchError(() =>
            of(
              cartActions.fetchCartItemsError({
                errorMessage: "Error fetching cart items",
              })
            )
          )
        )
      )
    );
  },
  { functional: true }
);

export const init = createEffect(
  () =>
    timer(0, REFRESH_CART_ITEMS_INTERVAL_MS).pipe(
      map(() => cartActions.timerTick())
    ),
  { functional: true }
);