import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { todosSlice } from "./todosSlice";

const persistConfig = {
  key: "root",
  storage,
};

const middleware = getDefaultMiddleware({
  serializableCheck: false,
});

const persistedReducer = persistReducer(persistConfig, todosSlice.reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
  //   devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
