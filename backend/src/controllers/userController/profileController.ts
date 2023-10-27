import { Request, Response } from "express";
import userModel from "../../models/userModel";


const getUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId
        console.log(userId);
        
        const user = await userModel.findById(userId)

        if(!user) {
            return res.status(404).json({message: "User not found!"})
        }

        return res.status(201).json({message: user})
       
    } catch (error) {
        console.error(error);
        
    }
}

export { getUserProfile }