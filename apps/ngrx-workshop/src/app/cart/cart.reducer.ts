import { CartItem } from "@angular-monorepo/api-interfaces";
import { createReducer, on } from "@ngrx/store";
import { productDetailsActions } from "../product/product-details/actions";

export const CART_FEATURE_KEY = "cart";

export interface CartState {
  cartItems?: CartItem[];
}

const initState: CartState = {
  cartItems: undefined,
};

export const cartReducer = createReducer(
  initState,
  on(productDetailsActions.addToCart, (state, { productId }) => {
    const cartItemsClone = state.cartItems ? [...state.cartItems] : [];
    const cartItemIndex = cartItemsClone.findIndex(
      (cartItem) => cartItem.productId === productId
    );

    if (cartItemIndex < 0) {
      cartItemsClone.push({
        productId,
        quantity: 1,
      });
    } else {
      cartItemsClone.splice(cartItemIndex, 1, {
        productId,
        quantity: cartItemsClone[cartItemIndex].quantity + 1,
      });
    }
    return {
      ...state,
      cartItems: cartItemsClone,
    };
  })
);
