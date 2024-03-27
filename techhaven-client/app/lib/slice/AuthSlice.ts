import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../config";
import axios from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { NextApiResponse } from "next";
import { createCookie, getCookie } from "../actions";

interface User {
    userId: String;
    firstName: String;
    lastName: String;
    phoneNumber: String;
    emailAddress: String;
    password: String;
}

const initialState: User = {
    userId: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    password: "",
};

export const signIn = createAsyncThunk("user/fetch", async (data: Object) => {
    try {
        const response = await axios.post(`${baseUrl}/users/login`, data);
        const decodedToken = jwtDecode<JwtPayload>(response.data.token);
        const {
            userId,
            firstName,
            lastName,
            phoneNumber,
            emailAddress,
            password,
        } = decodedToken.sub;

        const currentUser: User = {
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            emailAddress: emailAddress,
            password: password,
        };
        createCookie("session", response.data.token);
        return currentUser;
    } catch (error) {
        throw new Error("Failed to fetch user");
    }
});

export const checkAuthentication = createAsyncThunk(
    "user/authenticated",
    async () => {
        try {
            let jwt: string | undefined = "";
            const cookie = getCookie("session");
            await cookie.then((data) => {
                jwt = data?.value;
            });
            const decodedToken = jwtDecode<JwtPayload>(jwt);
            const {
                userId,
                firstName,
                lastName,
                phoneNumber,
                emailAddress,
                password,
            } = decodedToken.sub;

            const currentUser: User = {
                userId: userId,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                emailAddress: emailAddress,
                password: password,
            };
            return currentUser;
        } catch (error) {
            throw new Error("Failed to authenticate");
        }
    }
);

const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signIn.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(checkAuthentication.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

export default authSlice.reducer;
