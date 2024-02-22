import { data } from "@angular-monorepo/mock-data";
import { ProductModel } from "../model/product";
import * as productListActions from "./product-list/actions";
import { createFeature, createReducer, on } from "@ngrx/store";
import { productApiActions } from "./actions";

// export interface GlobalState {
//   product: ProductState;
// }

interface ProductState {
  products: ProductModel[] | undefined;
}

const initState: ProductState = {
  products: undefined,
};

export const productFeature = createFeature({
  name: "product",
  reducer: createReducer(
    initState,
    on(productListActions.productsOpened, (state) => ({
      ...state,
      products: [...data],
    })),
    on(productApiActions.productsFetchedSuccess, (state, { products }) => ({
      ...state,
      products: [...products],
    })),
    on(productApiActions.productsFetchedError, (state) => ({
      ...state,
      products: [],
    })),
    on(productApiActions.singleProductFetchedSuccess, (state, { product }) => {
      const productsClone = state.products ? [...state.products] : [];
      const indexOfProduct = productsClone.findIndex(
        (p) => p.id === product.id
      );

      if (indexOfProduct < 0) {
        productsClone.push(product);
      } else {
        productsClone.splice(indexOfProduct, 1, product);
      }

      return {
        ...state,
        products: productsClone,
      };
    })
  ),
});
