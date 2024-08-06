import { PrismaClient } from "@prisma/client";
import { Request, Router } from "express";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from 'cloudinary';
import { authMiddleware } from "../middleware";

require('dotenv').config();

const userRouter = Router();
const prismaClient = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "krishna123";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.cloudnary_cloud_name,
  api_key: process.env.cloudnary_api_key,
  api_secret: process.env.cloudnary_api_secret,
});


// Route to generate a presigned URL for uploading to Cloudinary
userRouter.get("/presignedUrl", authMiddleware, (req, res) => {
  const timestamp = Math.round((new Date).getTime() / 1000);
  const uploadPreset = 'unsigned-test'; // Replace with your Cloudinary upload preset
  const folder = `web3/${Math.random()}/`;

  // Generate signature for the request
  const signature = cloudinary.utils.api_sign_request({
    timestamp: timestamp,
    upload_preset: uploadPreset,
    folder: folder
  }, cloudinary.config().api_secret || "");

  // Return necessary data for client-side upload
  res.json({
    url: `https://api.cloudinary.com/v1_1/${cloudinary.config().cloud_name}/upload`,
    signature: signature,
    timestamp: timestamp,
    api_key: cloudinary.config().api_key,
    upload_preset: uploadPreset,
    folder: folder
  });
});

// Route to handle signing in using a wallet
userRouter.post("/signin", async (req, res) => {
  const hardCodedWalletAddresss = "0x39Fd26A4d0D3aA35a48472F44449051B111a2201";
  const existingUser = await prismaClient.user.findFirst({
    where: {
      address: hardCodedWalletAddresss,
    }
  });
  if (existingUser) {
    const token = jwt.sign({
      userId: existingUser.id,
    }, JWT_SECRET);
    res.json({ token });
  } else {
    const user = await prismaClient.user.create({
      data: {
        address: hardCodedWalletAddresss,
      }
    });
    const token = jwt.sign({
      userId: user.id
    }, JWT_SECRET);

    res.json({ token });
  }
});

export default userRouter;
