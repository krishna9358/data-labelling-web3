import express, { Router } from "express";
import userRouter from "./routers/user";
import workerRouter from "./routers/worker";

const app = express();
const PORT = process.env.PORT || 3000;


app.use("/v1/user", userRouter);
app.use("/v1/worker", workerRouter);


app.get("/" , (req,res) =>{
    res.send("hello world");
});



app.listen(PORT, () => {
    console.log("Running on Port 3000")
})
