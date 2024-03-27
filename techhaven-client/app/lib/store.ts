import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slice/AuthSlice";
import ProductSlice from "./slice/ProductSlice";
import CollectionSlice from "./slice/CollectionSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            user: AuthSlice,
            items: ProductSlice,
            collections: CollectionSlice,
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
