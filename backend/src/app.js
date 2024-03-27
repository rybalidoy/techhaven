import express from "express";
import { server } from "./configs/config.js";
import connect from "./configs/db.js";
import cors from "cors";
import routes from "./configs/routes.js";

const app = express();

app.use(express.json());

// Connect database
connect();

// CORS
app.use(cors());

app.use("/api", routes);

app.listen(server.port, () => {
    console.log("Server listening on port:", server.port);
});
