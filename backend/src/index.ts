import express from "express";
import upload from "./upload";
const app = express();

app.get("/" , (req,res) =>{
    res.send("hello world");
});

upload();

app.listen(3000, () => {
    console.log("Running on Port 3000")
})
