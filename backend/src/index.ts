import express, { Router } from "express";
import upload from "./upload";
import userRouter from "./routers/user";
import workerRouter from "./routers/worker";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/" , (req,res) =>{
    res.send("hello world");
});

app.use("/v1/user", userRouter);
app.use("/v1/worker", workerRouter);

//uploading image
upload();

app.listen(PORT, () => {
    console.log("Running on Port 3000")
})
