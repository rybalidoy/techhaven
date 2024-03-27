import dotenv from "dotenv";

dotenv.config();

export const database = {
    uri: process.env.MONGO_URI,
};

export const server = {
    host: process.env.HOST,
    port: process.env.PORT,
};

export const authentication = {
    secret: process.env.SECRET_KEY,
};
