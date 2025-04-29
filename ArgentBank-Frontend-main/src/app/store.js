import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import userReducer from "../features/userSlice"
import authReducer from "../features/authSlice"

const userPersistConfig = {
  key: 'user',
  storage: sessionStorage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

const store = configureStore(
  {
    reducer: {
      auth: authReducer,
      user: persistedUserReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  }
)

const persistor = persistStore(store);

export { store, persistor }; 