import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import userModel from "../models/userModel";
import asyncHandler from "express-async-handler";
import { Document, ObjectId } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

interface customUser {
  id: ObjectId;
  username: string;
  user: any | null;
}

// Extend the Request object to include a decodedToken property
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: customUser;
    }
  }
}

const protect = asyncHandler(
 
  
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    
    const token = req.headers.authorization?.split(" ")[1];
    const secretKey = process.env.JWT_SECRET as string;

    if (!token) {
      res.status(401).json({ message: "Token not provided" });
      return 
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, secretKey) as JwtPayload;
        const userId: string = decoded.user_id;
        // console.log("token is valid:", decoded);

        const user = await userModel
          .findById(userId)
          .select("-password");
          
        if (user && user?.isBlocked === false) {   
          req.user = user as unknown as customUser;
          next();
        } else if (user?.isBlocked === true) {
          res.status(401).json({message: "User is blocked"});
          return;
        } else {
          res.status(404);
          throw new Error("User not found");
        }
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized or Invalid token");
      }
    }
  }
);

export { protect };
