import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../config";
import axios from "axios";
import build from "next/dist/build";

interface Product {
    _id: String;
    name: String;
    description: Record<string, any>;
    brand: String;
    imageUrl: String[];
    defaultPrice: Number;
    totalStock: Number;
    totalSold: Number;
    variants: Record<string, any>;
    collectionId: String;
    adminId: String;
    reviews: Record<string, any>[];
}

const initialState: { products: Product[]; brands: string[] } = {
    products: [],
    brands: [],
};

export const fetchAllProducts = createAsyncThunk("products/fetch", async () => {
    try {
        const response = await axios.get(`${baseUrl}/products`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch products");
    }
});

export const fetchProductsByCollection = createAsyncThunk(
    "collection/products/fetch",
    async (collectionName: String) => {
        try {
            const response = await axios.get(
                `${baseUrl}/products/${collectionName}`
            );
            return response.data;
        } catch (error) {
            throw new Error("Failed to fetch products");
        }
    }
);

export const fetchBrands = createAsyncThunk(
    "products/brands/fetch",
    async () => {
        try {
            const response = await axios.get(`${baseUrl}/products/brands`);
            return response.data;
        } catch (error) {
            throw new Error("Failed to fetch product brands");
        }
    }
);
export const searchProducts = createAsyncThunk(
    "products/search",
    async (keyword: String) => {
        try {
            const response = await axios.get(
                `${baseUrl}/products/search?q=${keyword}`
            );
            return response.data;
        } catch (error) {
            throw new Error("Failed to fetch products");
        }
    }
);

const productSlice = createSlice({
    name: "items",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
            return { ...state, products: action.payload };
        });
        builder.addCase(searchProducts.fulfilled, (state, action) => {
            return { ...state, products: action.payload };
        });
        builder.addCase(
            fetchProductsByCollection.fulfilled,
            (state, action) => {
                return { ...state, products: action.payload };
            }
        );
        builder.addCase(fetchBrands.fulfilled, (state, action) => {
            return { ...state, brands: action.payload };
        });
    },
});

export default productSlice.reducer;
