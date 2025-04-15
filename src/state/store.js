
import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './global/globalSlice';
import { api } from '../services/api';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
    
setupListeners(store.dispatch);

export default store;