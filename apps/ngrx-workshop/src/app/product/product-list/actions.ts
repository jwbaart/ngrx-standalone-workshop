import { createAction } from "@ngrx/store";

const prefix = "[Product List Page]";

export const productsOpened = createAction(`${prefix} Opened`);
