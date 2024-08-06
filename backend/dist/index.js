"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_1 = __importDefault(require("./upload"));
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("hello world");
});
(0, upload_1.default)();
app.listen(3000, () => {
    console.log("Running on Port 3000");
});