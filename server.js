import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Api, Mongodburl, Port } from "./constant.js";
import userRouterApi from "./Routes/Api/V1/userRoutes.js";
import studentRouterApi from "./Routes/Api/V1/studentRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(Mongodburl)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(Port, () => {
      console.log("Server Is Running");
    });
  })
  .catch(() => {
    console.log("MongoDB Connection Failed");
    process.exit(1);
  });

app.use(`${Api}/user`, userRouterApi);
app.use(`${Api}/student`, studentRouterApi);
