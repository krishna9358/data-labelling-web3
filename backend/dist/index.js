"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routers/user"));
const worker_1 = __importDefault(require("./routers/worker"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use("/v1/user", user_1.default);
app.use("/v1/worker", worker_1.default);
app.get("/", (req, res) => {
    res.send("hello world");
});
app.listen(PORT, () => {
    console.log("Running on Port 3000");
});
