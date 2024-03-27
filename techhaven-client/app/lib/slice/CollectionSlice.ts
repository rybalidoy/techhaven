import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../config";
import axios from "axios";

export interface Collection {
    _id: String;
    name: String;
    imageUrl: String;
    adminId: String;
    categoryId: String;
}

const initialState: Collection[] = [];

export const fetchCollections = createAsyncThunk(
    "collections/fetch",
    async () => {
        try {
            const response = await axios.get(`${baseUrl}/collections`);
            return response.data;
        } catch (error) {
            throw new Error("Failed to fetch collections");
        }
    }
);
const collectionSlice = createSlice({
    name: "collections",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCollections.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

export default collectionSlice.reducer;
