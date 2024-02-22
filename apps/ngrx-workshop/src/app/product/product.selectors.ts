import { createSelector } from "@ngrx/store";
import { productFeature } from "./product.reducer";
import { selectRouterParam } from "../router/router.selectors";

export const selectProducts = productFeature.selectProducts;
export const selectCurrentProductId = selectRouterParam("productId");

export const selectCurrentProduct = createSelector(
  selectProducts,
  selectCurrentProductId,
  (products, id) => {
    if (id == null || !products) return undefined;
    return products.find((product) => product.id === id);
  }
);
