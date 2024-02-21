import { createActionGroup, emptyProps } from "@ngrx/store";

export const cartDetailsActions = createActionGroup({
  source: "Card Details Page",
  events: {
    pageOpened: emptyProps(),
    purchaseSuccess: emptyProps(),
  },
});
