import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {productsData} from "../data";


//We can creat types folder and import

interface Product {
    id: number,
    name: string,
    price: number,
    category: string,
    available: string,
    description: string
}

interface ProductsState {
    list: Product[];
}


const initialState: ProductsState = {
    list: productsData,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.list = action.payload;
        },
        addProduct: (state, action: PayloadAction<Product>) => {
            state.list.push(action.payload);
        },
        updateProduct: (state, action: PayloadAction<Product>) => {
            const index = state.list.findIndex((product) => product.id === action.payload.id);
            if (index !== -1) {
                state.list[index] = action.payload;
            }
        },
        deleteProduct: (state, action: PayloadAction<number>) => {
            state.list = state.list.filter((product) => product.id !== action.payload);
        },
    },
});

export const { setProducts, addProduct, updateProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
