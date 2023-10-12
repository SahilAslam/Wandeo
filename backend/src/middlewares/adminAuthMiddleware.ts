import jwt  from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const adminProtect = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authorizationHeader = req.headers["authorization"];
        console.log(req.headers, '////////');
        

        if(!authorizationHeader) {
            throw new Error("Authorization header is missing!");          
        }

        const token: string | undefined = authorizationHeader.split(" ")[1];

        if(!token) {
            throw new Error("Token missing in authorization header");
        }

        const decodedToken = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as { user_id: string };

        req.body.userId = decodedToken.user_id;

        const adminId = "ObjectId(6502229c761cead53ce1099u)"
        if(adminId !== req.body.userId) {
            throw new Error("User not found!")
        } else {
            next();
        }
    } catch(error) {
        console.error(error);
        res.status(401)
        throw new Error("Not authorized or Invalid token");
    }
}

export { adminProtect };