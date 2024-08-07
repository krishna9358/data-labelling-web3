import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "krishna123";

// Define the custom request interface
export interface AuthenticatedRequest extends Request {
  userId?: string; // Optional userId property
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"] ?? "";

  // Check if the authHeader contains the "Bearer" prefix
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Authorization token missing",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    if (decoded.userId) {
      req.userId = decoded.userId;
      return next();
    } else {
      return res.status(403).json({
        message: "Invalid token",
      });
    }
  } catch (e) {
    return res.status(403).json({
      message: "You are not logged in",
    });
  }
}
