import { PrismaClient } from "@prisma/client";
import { configDotenv } from "dotenv";
import { Router } from "express";
import jwt from "jsonwebtoken";

require('dotenv').config();

const userRouter = Router();
const prismaClient = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "krishna123";

//signging using wallet
userRouter.post("/signin", async (req, res) => {
        const hardCodedWalletAddresss = "0x39Fd26A4d0D3aA35a48472F44449051B111a2201";
        const existingUser = await prismaClient.user.findFirst({
             where : {
                address : hardCodedWalletAddresss,
                }
        })
        if (existingUser) {
                const token = jwt.sign({
                        userId : existingUser.id
                }, JWT_SECRET)
                res.json({token})
        }
        else{
                const user = await prismaClient.user.create({
                        data: {
                                address : hardCodedWalletAddresss,
                        }
                })
                const token = jwt.sign({
                        userId: user.id
                }, JWT_SECRET)
        
                res.json({token})
        }
});

export default userRouter;