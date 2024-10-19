import { configureStore } from "@reduxjs/toolkit";
import session from "redux-persist/lib/storage/session";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import authenticationReducer from "./slices/authenticationSlice";
import adminAuthenticationSlice from "./adminSlices/adminAuthenticationSlice";

const reducers = combineReducers({
  // Add reducers here
  auth: authenticationReducer,
  adminAuth: adminAuthenticationSlice,
});

const persistState = {
  transform: [
    encryptTransform({
      secretKey: "my-super-secret",
      onError: function (error) {
        console.error(error);
      },
    }),
  ],
  key: "root",
  storage: session,
  whitelist: ["auth", "adminAuth"],
};

const persistedReducer = persistReducer(persistState, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
