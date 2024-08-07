import { PrismaClient } from "@prisma/client";
import { Request, Router } from "express";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from 'cloudinary';
import { AuthenticatedRequest, authMiddleware } from "../middleware";

require('dotenv').config();

const userRouter = Router();
const prismaClient = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "krishna123";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to generate a signature
const generateSignature = (params : any) => {
  return cloudinary.utils.api_sign_request(params, cloudinary.config().api_secret || "");
};

// Route to generate a presigned URL
userRouter.get("/presignedUrl", authMiddleware, (req: AuthenticatedRequest, res) => {
  const timestamp = Math.round((new Date()).getTime() / 1000);
  const uploadPreset = 'vq7qpa0d'; // Replace with your signed upload preset
  const userId = req.userId;
  const folder = `web3/${userId}/${Math.random()}/`;
  
  if (!userId) {
    return res.status(403).json({
      message: "User ID not found",
    });
  }

  // Generate signature for the request
  const signature = generateSignature({
    timestamp: timestamp,
    upload_preset: uploadPreset,
    folder: folder
  });

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
