import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { todosSlice } from "./todosSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, todosSlice.reducer);

export const store = configureStore({
  reducer: persistedReducer,
  //   devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
