import express, { Router } from "express";
import upload from "./upload";
import userRouter from "./routers/user";
import workerRouter from "./routers/worker";

const app = express();

app.get("/" , (req,res) =>{
    res.send("hello world");
});

app.use("/v1/user", userRouter);
app.use("/v1/worker", workerRouter);

//uploading image
upload();

app.listen(3000, () => {
    console.log("Running on Port 3000")
})
