// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './prodcutsSlice';

const store = configureStore({
    reducer: {
        products: productsReducer,
    },
});

export default store;
