import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideRouter } from "@angular/router";
import { routes } from "./app/router/routes";
import { provideHttpClient } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideState, provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { productFeature } from "./app/product/product.reducer";
import { provideEffects } from "@ngrx/effects";
import { provideRouterStore, routerReducer } from "@ngrx/router-store";
import { ProductEffects } from "./app/product/product.effect";
import * as errorEffects from "./app/error.effects";
import * as cartEffects from "./app/cart/cart.effect";
import { CART_FEATURE_KEY, cartReducer } from "./app/cart/cart.reducer";
import { ROUTER_FEATURE_KEY } from "./app/router/router.selectors";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideStore(),
    provideEffects(ProductEffects, errorEffects, cartEffects),
    provideState(CART_FEATURE_KEY, cartReducer),
    provideState(ROUTER_FEATURE_KEY, routerReducer),
    provideState(productFeature),
    provideRouterStore({ stateKey: ROUTER_FEATURE_KEY }),
    provideStoreDevtools(),
  ],
});
